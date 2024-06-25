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
import ItemList from "../../components/ItemList.tsx";
import {PaneSection} from "../../components/PaneSection.tsx";

export default function SiteStatusView() {

    const [page, setPage] = useState<number>(1);

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

    if (lidarMetadataListError) return <ErrorMessage error={lidarMetadataListError}/>
    if (bulkStatusError) return <ErrorMessage error={bulkStatusError}/>
    if (lidarMetadataListPending || bulkStatusPending) return <LoadingSpinner/>

    const siteStatusItems = bulkStatus?.map((siteItem: StatusMetadataComposite_t) => {
        return <SiteStatusItem key={siteItem.siteId} {...siteItem} />
    })

    const generateStatusMarkers = () => {

        const siteIds = getSiteIds(lidarMetadataList!.items)

        return siteIds.map((siteId: number) => {
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

    }

    const siteStatusMarkers = generateStatusMarkers().map((marker) => {
        return <SiteStatusMarker key={marker!.siteId} longitude={marker!.longitude} latitude={marker!.latitude} siteStatus={marker?.siteStatus} />
    })

    return (
        <>
            <Pane>
                <PaneSection label="Deployment Edge Operational Status" description="View information related deployments storage and service information.">
                        <ItemList>
                            {siteStatusItems}
                        </ItemList>
                        <Pagination currentPage={page} setPage={setPage} pageSize={lidarMetadataList.size}
                                    totalItemCount={lidarMetadataList.total}/>
                </PaneSection>
            </Pane>
            <MobileDisableWrapper>
                <Pane stretch>
                    <PaneSection fillHeight>
                        <Map>
                            {siteStatusMarkers}
                        </Map>
                    </PaneSection>
                </Pane>
            </MobileDisableWrapper>
        </>
    )
}