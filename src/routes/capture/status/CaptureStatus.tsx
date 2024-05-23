import {Map} from "../../../components/Map.tsx";
import useLidarMetadataList from "../../../hooks/useLidarMetadataList.tsx";
import {ReactElement, useState} from "react";
import useBulkStatus from "../../../hooks/useBulkStatus.tsx";
import {
    LidarMetadata_t,
    PcapService_t, RosService_t,
    StatusMetadata_t,
    StatusMetadataComposite_t
} from "../../../types.tsx";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner.tsx";
import {ErrorOccurred} from "../../../components/ErrorOccurred.tsx";
import LidarStatusItem from "../../../components/LidarStatusItem.tsx";
import LidarMarker from "../../../components/LidarMarker.tsx";
import {Pagination, PaginationItem} from "../../../components/Pagination.tsx";

export default function CaptureStatus() {

    const [page, setPage] = useState(1);
    const {
        isLoading: isLidarMetadataLoading,
        error: errorLidarMetadata,
        data: dataLidarMetadata
    } = useLidarMetadataList(page)

    const getLidarStatus = (statuses: Array<StatusMetadataComposite_t>, lidar: LidarMetadata_t): StatusMetadata_t => {
        const status = statuses.find((statusMetadata: StatusMetadataComposite_t) => statusMetadata.siteId === lidar.site_id)
        return {
            pcapServiceStatus: status?.pcapServiceStatus.find((service: PcapService_t) => service.lidarId === lidar.lidar_id),
            rosServiceStatus: status?.rosServiceStatus.find((service: RosService_t) => service.lidarId === lidar.lidar_id),
            edgeStorageStatus: status?.edgeStorageStatus,
            siteId: status?.siteId
        } as StatusMetadata_t
    }

    const getSiteIds = (sites: Array<LidarMetadata_t> | undefined): Array<number> => {
        if (sites === undefined) return []
        const siteIds = sites.map((site: LidarMetadata_t) => {
            return site.site_id
        })
        return [...new Set(siteIds)]
    }

    const {
        isLoading: isBulkStatusLoading,
        error: errorBulkStatus,
        data: dataBulkStatus
    } = useBulkStatus(getSiteIds(dataLidarMetadata?.items));

    const renderStatusItems = (): ReactElement => {
        if (isLidarMetadataLoading || isBulkStatusLoading) return <LoadingSpinner/>
        if (errorLidarMetadata) return <ErrorOccurred error={errorLidarMetadata}/>
        if (errorBulkStatus) <ErrorOccurred error={errorBulkStatus}/>

        return (<> {
            dataLidarMetadata && dataLidarMetadata.items.map((item: LidarMetadata_t) => {
                return <LidarStatusItem key={item.lidar_id} lidarItem={item}
                                        statusMetadata={getLidarStatus(dataBulkStatus || [], item)}/>
            })} </>)
    }

    const renderLidarMarkers = () => {

        if (isLidarMetadataLoading || isBulkStatusLoading) return null
        if (errorLidarMetadata) return null
        if (errorBulkStatus) return null

        return dataLidarMetadata?.items.map((item: LidarMetadata_t) => {
            return <LidarMarker key={item.lidar_id} lidarItem={item}/>
        })

    }


    return (
        <div className='flex md:flex-row h-full gap-5'>
            <div className='hidden md:block md:h-full grow '>
                <Map className='w-full h-full rounded-md drop-shadow-md'>
                    <>{renderLidarMarkers()}</>
                </Map>
            </div>
            <div className='flex flex-col gap-2 h-full md:w-[440px]'>
                <div className='flex flex-col gap-2'>
                    <p className='font-semibold text-3xl leading-tight'>
                        Intersection Edge Deployment Status
                    </p>
                    <p className='leading-snug'>
                        View at-a-glance information regarding deployments storage, services, and status for capturing.
                    </p>
                </div>
                <div className='flex flex-col gap-5 grow overflow-auto p-2'>
                    {renderStatusItems()}
                </div>
                <Pagination className=''>
                    <PaginationItem setter={setPage} assignedPage={1} currentPage={page} />
                    <PaginationItem setter={setPage} assignedPage={2} currentPage={page} />
                </Pagination>
            </div>
        </div>
    )
}
