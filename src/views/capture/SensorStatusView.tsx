import {Dispatch, ReactElement, SetStateAction, useMemo, useState} from "react";
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
import {RadioForm, RadioFormItem} from "../../components/forms/RadioForm.tsx";
import {SensorStatusMarker} from "../../components/map/SensorStatusMarker.tsx";

interface StatusMarkerFilterOptionsProps_t {
    currentMarkerFormat: RecordingFormat;
    setCurrentMarkerFormat: Dispatch<SetStateAction<RecordingFormat>>;
}
function StatusMarkerFilterOptions({currentMarkerFormat, setCurrentMarkerFormat}: StatusMarkerFilterOptionsProps_t) {

    return (
        <>
            <RadioForm formLabel="Service Selection" selected={currentMarkerFormat} setSelection={setCurrentMarkerFormat}>
                <RadioFormItem label="PCAP" value="pcap" />
                <RadioFormItem label="ROS" value="ros" />
            </RadioForm>
        </>
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

    if (lidarMetadataListError) return <ErrorMessage error={lidarMetadataListError}/>
    if (bulkStatusError) return <ErrorMessage error={bulkStatusError}/>
    if (lidarMetadataListPending || bulkStatusPending) return <LoadingSpinner/>

    const sensorStatusItems = lidarMetadataList?.items.map((sensorItem: LidarMetadata_t) => {
        return <SensorStatusItem key={sensorItem.lidar_id} lidarMetadata={sensorItem} statusMetadata={getLidarStatus(bulkStatus!, sensorItem)} />
    })

    return (
        <>
            <Pane label="Sensors Operational Status"
                  description="View information related sensors respective services and status information."
                  footerComponent={<Pagination currentPage={page} setPage={setPage} pageSize={lidarMetadataList.size} totalItemCount={lidarMetadataList.total} />}>
                <ItemList>
                    {sensorStatusItems}
                </ItemList>
            </Pane>
            <MobileDisableWrapper>
                <Pane stretch headingComponent={<StatusMarkerFilterOptions currentMarkerFormat={markerFormat} setCurrentMarkerFormat={setMarkerFormat} />}>
                    <Map>
                        {statusMarkers}
                    </Map>
                </Pane>
            </MobileDisableWrapper>
        </>
    )
}