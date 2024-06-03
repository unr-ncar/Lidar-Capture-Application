import {useState} from "react";
import useLidarMetadataList from "../../hooks/useLidarMetadataList.tsx";
import useBulkStatus from "../../hooks/useBulkStatus.tsx";
import getSiteIds from "../../functions/getSiteIds.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {Pane} from "../../components/Pane.tsx";
import {Map} from "../../components/map/Map.tsx";
import {LidarMetadata_t} from "../../types.tsx";
import {SensorStatusItem} from "../../components/SensorStatusItem.tsx";
import getLidarStatus from "../../functions/getLidarStatus.tsx";
import {Pagination} from "../../components/Pagination.tsx";

export default function SensorStatusView() {

    const [currentPage, setCurrentPage] = useState<number>(1);

    const {
        isPending: lidarMetadataListPending,
        error: lidarMetadataListError,
        data: lidarMetadataList
    } = useLidarMetadataList(currentPage)

    const {
        isPending: bulkStatusPending,
        error: bulkStatusError,
        data: bulkStatus
    } = useBulkStatus(getSiteIds(lidarMetadataList!.items));

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
                  footer={<Pagination currentPage={currentPage} setPage={setCurrentPage} pageSize={lidarMetadataList.size} totalItemCount={lidarMetadataList.total} />}>
                <div className='flex flex-col gap-4'>
                    {sensorStatusItems}
                </div>
            </Pane>
            <Pane stretch>
                <Map>

                </Map>
            </Pane>
        </>
    )
}