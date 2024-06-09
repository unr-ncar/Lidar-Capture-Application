import {Dispatch, ReactElement, SetStateAction, useEffect, useMemo, useState} from "react";
import useLidarMetadataList from "../../hooks/useLidarMetadataList.tsx";
import useBulkStatus from "../../hooks/useBulkStatus.tsx";
import getSiteIds from "../../functions/getSiteIds.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {Pane} from "../../components/Pane.tsx";
import {Map} from "../../components/map/Map.tsx";
import {LidarMetadata_t, RecordingFormat} from "../../types.tsx";
import {SensorStatusItem} from "../../components/SensorStatusItem.tsx";
import getLidarStatus from "../../functions/getLidarStatus.tsx";
import {Pagination} from "../../components/Pagination.tsx";
import {MobileDisableWrapper} from "../../components/utilities/MobileDisableWrapper.tsx";
import ItemList from "../../components/ItemList.tsx";
import {SensorStatusMarker} from "../../components/map/SensorStatusMarker.tsx";
import {PaneSection} from "../../components/PaneSection.tsx";
import {SelectForm, SelectOption} from "../../components/forms/SelectForm.tsx";

interface StatusMarkerFilterOptionsProps_t {
    currentMarkerFormat: RecordingFormat;
    setCurrentMarkerFormat: Dispatch<SetStateAction<RecordingFormat>>;
}
function StatusMarkerFilterOptions({currentMarkerFormat, setCurrentMarkerFormat}: StatusMarkerFilterOptionsProps_t) {

    return (
        <div>
            <SelectForm formLabel="Service Selection" formDescription="Select which service status to view for displayed intersections." selected={currentMarkerFormat} setSelection={setCurrentMarkerFormat}>
                <SelectOption label="PCAP" value="pcap" />
                <SelectOption label="ROS" value="ros" />
            </SelectForm>
        </div>
    )
}

export default function SensorStatusView() {

    const [page, setPage] = useState<number>(1);
    const [markerFormat, setMarkerFormat] = useState<RecordingFormat>('pcap')

    const {
        isPending: lidarMetadataListPending,
        error: lidarMetadataListError,
        data: lidarMetadataList
    } = useLidarMetadataList(page)

    const {
        isPending: bulkStatusPending,
        error: bulkStatusError,
        data: bulkStatus
    } = useBulkStatus(getSiteIds(lidarMetadataList!.items));

    const statusMarkers = useMemo<ReactElement | Array<ReactElement> | undefined>(
        () => {
            if (lidarMetadataListPending || bulkStatusPending) return undefined;
            return lidarMetadataList?.items.map((metadataItem: LidarMetadata_t) => {
                const lidarStatus = getLidarStatus(bulkStatus!, metadataItem)
                if (markerFormat === 'pcap') {
                    return <SensorStatusMarker key={metadataItem.lidar_id} longitude={metadataItem.longitude} latitude={metadataItem.latitude} sensorStatus={lidarStatus.pcapServiceStatus} />
                } else {
                    return <SensorStatusMarker key={metadataItem.lidar_id} longitude={metadataItem.longitude} latitude={metadataItem.latitude} sensorStatus={lidarStatus.rosServiceStatus} />
                }
            })
        },
        [bulkStatus, bulkStatusPending, lidarMetadataList?.items, lidarMetadataListPending, markerFormat]
    )

    useEffect(() => {
        console.log(markerFormat)
    }, [markerFormat])

    if (lidarMetadataListError) return <ErrorMessage error={lidarMetadataListError}/>
    if (bulkStatusError) return <ErrorMessage error={bulkStatusError}/>
    if (lidarMetadataListPending || bulkStatusPending) return <LoadingSpinner/>

    const sensorStatusItems = lidarMetadataList?.items.map((sensorItem: LidarMetadata_t) => {
        return <SensorStatusItem key={sensorItem.lidar_id} lidarMetadata={sensorItem} statusMetadata={getLidarStatus(bulkStatus!, sensorItem)} />
    })

    return (
        <>
            <Pane>
                <MobileDisableWrapper>
                    <PaneSection label="Map Filtering" description="Filter sensor markers using the following ">
                        <StatusMarkerFilterOptions currentMarkerFormat={markerFormat} setCurrentMarkerFormat={setMarkerFormat} />
                    </PaneSection>
                </MobileDisableWrapper>
                <PaneSection label="Sensors Operational Status" description="View information related sensors respective services and status information.">
                    <div className='flex flex-col gap-4'>
                        <ItemList>
                            {sensorStatusItems}
                        </ItemList>
                        <Pagination currentPage={page} setPage={setPage} pageSize={lidarMetadataList.size}
                                    totalItemCount={lidarMetadataList.total}/>
                    </div>
                </PaneSection>
            </Pane>
            <MobileDisableWrapper>
                <Pane stretch>
                    <PaneSection>
                        <Map>
                            {statusMarkers}
                        </Map>
                    </PaneSection>
                </Pane>
            </MobileDisableWrapper>
        </>
    )
}