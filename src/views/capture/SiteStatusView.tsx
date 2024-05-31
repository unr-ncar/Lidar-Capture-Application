import {Pane} from "../../components/Pane.tsx";
import {MobileDisableWrapper} from "../../components/utilities/MobileDisableWrapper.tsx";
import useLidarMetadataList from "../../hooks/useLidarMetadataList.tsx";
import useBulkStatus from "../../hooks/useBulkStatus.tsx";
import getSiteIds from "../../functions/getSiteIds.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import {LidarMetadata_t, StatusMetadataComposite_t} from "../../types.tsx";
import {SiteStatusItem} from "../../components/SiteStatusItem.tsx";
import {Map} from "../../components/map/Map.tsx";
import {SiteStatusMarker} from "../../components/map/SiteStatusMarker.tsx";
import {Pagination} from "../../components/Pagination.tsx";
import {useState} from "react";

export default function SiteStatusView() {

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

    const siteStatusItems = bulkStatus?.map((siteItem: StatusMetadataComposite_t) => {
        return <SiteStatusItem key={siteItem.siteId} {...siteItem} />
    })

    const siteStatusMarkers = () => {

        const siteIds = getSiteIds(lidarMetadataList!.items)

        const statusMarkers = siteIds.map((siteId: number) => {
            const intersectionCenter = lidarMetadataList?.items.find((item: LidarMetadata_t) => item.site_id === siteId)?.intersection_center;
            const status = bulkStatus?.find((item: StatusMetadataComposite_t) => item.siteId === siteId)?.edgeStorageStatus;
            if (intersectionCenter === undefined) {
                return null;
            }

            return {
                siteId: siteId,
                longitude: intersectionCenter.longitude,
                latitude: intersectionCenter.latitude,
                siteStatus: status
            };
        }).filter(item => item !== null);

        return statusMarkers.map((marker) => {
            return <SiteStatusMarker key={marker!.siteId} longitude={marker!.longitude} latitude={marker!.latitude} siteStatus={marker?.siteStatus} />
        })
    }


    return (
        <>
            <Pane label="Deployment Edge Operational Status"
                  description="View information related deployments storage and service information."
                  footer={<Pagination currentPage={currentPage} setPage={setCurrentPage} pageSize={lidarMetadataList.size} totalItemCount={lidarMetadataList.total} />}>
                    <div className='flex flex-col gap-4'>
                        {siteStatusItems}
                    </div>
            </Pane>
            <MobileDisableWrapper>
                <Pane stretch>
                    <Map className='w-full h-full rounded-lg shadow-lg'>
                        {siteStatusMarkers()}
                    </Map>
                </Pane>
            </MobileDisableWrapper>
        </>
    )
}