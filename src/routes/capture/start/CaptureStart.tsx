import useLidarMetadataList from "../../../hooks/useLidarMetadataList.tsx";
import useBulkStatus from "../../../hooks/useBulkStatus.tsx";
import {LidarMetadata_t, LidarSelection_t, PcapService_t, RosService_t, StatusMetadata_t} from "../../../types.tsx";
import {useEffect, useState} from "react";
import useLidarSelections from "../../../hooks/useLidarSelections.tsx";
import LidarSelectionItem from "../../../components/LidarSelectionItem.tsx";

export default function CaptureStart() {

    const getSiteIds = (sites: Array<LidarMetadata_t> | undefined): Array<number> => {
        if (sites === undefined) return []
        const siteIds = sites.map((site: LidarMetadata_t) => {
            return site.site_id
        })
        return [...new Set(siteIds)]
    }

    const getLidarStatus = (statuses: Array<StatusMetadata_t>, lidar: LidarMetadata_t): StatusMetadata_t => {
        const status = statuses.find((statusMetadata: StatusMetadata_t) => statusMetadata.siteId === lidar.site_id)
        return {
            pcapServiceStatus: status?.pcapServiceStatus.find((service: PcapService_t) => service.lidarId === lidar.lidar_id),
            rosServiceStatus: status?.rosServiceStatus.find((service: RosService_t) => service.lidarId === lidar.lidar_id),
            edgeStorageStatus: status?.edgeStorageStatus,
            siteId: status?.siteId
        } as StatusMetadata_t
    }

    const [page, setPage] = useState<number>(1)
    const {
        isPending: isLoadingLidarList,
        error: errorLidarList,
        data: dataLidarList,
        isFetched
    } = useLidarMetadataList(page);
    const {
        isPending: isBulkStatusLoading,
        error: errorBulkStatus,
        data: dataBulkStatus
    } = useBulkStatus(getSiteIds(dataLidarList?.items));
    const setSelections = useLidarSelections((state) => state.setSelections)
    const selections = useLidarSelections((state) => state.selections)

    useEffect(() => {
        if (isFetched) {
            setSelections(dataLidarList?.items || [], 'start', 'pcap')
        }
    }, [isFetched, dataLidarList, setSelections]);

    const handleSetPage = (page: number) => {
        setPage(page)
    }

    return (
        <div className='flex flex-col gap-1.5'>
            <button onClick={() => handleSetPage(1)}>
                Page 1
            </button>
            <button onClick={() => handleSetPage(2)}>
                Page 2
            </button>
            <p>CaptureStart</p>
            <div className='flex flex-col gap-2'>
                {(isLoadingLidarList || isBulkStatusLoading) && <p>Loading...</p>}
                {(errorLidarList || errorBulkStatus) && <p>Error...</p>}
                {!isLoadingLidarList && !isBulkStatusLoading && selections.map((selection: LidarSelection_t) => {
                    return <LidarSelectionItem key={selection.item.lidar_id} lidarSelection={selection} statusMetadata={getLidarStatus(dataBulkStatus || [], selection.item)} />
                })}
            </div>
        </div>
    )
}
