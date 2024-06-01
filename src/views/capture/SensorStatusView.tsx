import {useState} from "react";
import useLidarMetadataList from "../../hooks/useLidarMetadataList.tsx";
import useBulkStatus from "../../hooks/useBulkStatus.tsx";
import getSiteIds from "../../functions/getSiteIds.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {Pane} from "../../components/Pane.tsx";
import {Map} from "../../components/map/Map.tsx";

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

    //if (lidarMetadataListError) return <ErrorMessage error={lidarMetadataListError}/>
    //if (bulkStatusError) return <ErrorMessage error={bulkStatusError}/>
    //if (lidarMetadataListPending || bulkStatusPending) return <LoadingSpinner/>

    return (
        <>
            <Pane minimalWidth>
                <div>

                </div>
            </Pane>
            <Pane stretch>
                <Map>

                </Map>
            </Pane>
            <Pane minimalWidth>

            </Pane>
        </>
    )
}