import {Pane} from "../../components/Pane.tsx";
import {MobileDisableWrapper} from "../../components/utilities/MobileDisableWrapper.tsx";
import {useState} from "react";
import useLidarMetadataList from "../../hooks/useLidarMetadataList.tsx";
import useBulkStatus from "../../hooks/useBulkStatus.tsx";
import getSiteIds from "../../functions/getSiteIds.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {ErrorOccurred} from "../../components/utilities/ErrorOccurred.tsx";
import {StatusMetadataComposite_t} from "../../types.tsx";
import {SiteStatusItem} from "../../components/SiteStatusItem.tsx";

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

    const siteStatusItems = bulkStatus?.map((siteItem: StatusMetadataComposite_t) => {
        return <SiteStatusItem key={siteItem.siteId} {...siteItem} />
    })

    if (lidarMetadataListError) return <ErrorOccurred error={lidarMetadataListError} />
    if (bulkStatusError) return <ErrorOccurred error={bulkStatusError} />
    if (lidarMetadataListPending || bulkStatusPending) return <LoadingSpinner />

    return (
        <>
            <Pane label="Deployment Edge Operational Status"
                  description="View information related deployments storage and service information.">
                <div className='flex flex-col gap-4'>
                    { siteStatusItems }
                </div>
            </Pane>
            <MobileDisableWrapper>
                <Pane stretch>
                    <p className='h-[2000px]'>
                        Hello World - Pane 2
                    </p>
                </Pane>
            </MobileDisableWrapper>
        </>
    )
}