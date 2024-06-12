import {PaneSection} from "../../components/PaneSection.tsx";
import {Pane} from "../../components/Pane.tsx";
import {Map} from "../../components/map/Map.tsx";
import {useEffect, useState} from "react";
import useLidarMetadataList from "../../hooks/useLidarMetadataList.tsx";
import useSensorSelections from "../../hooks/useSensorSelections.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {Pagination} from "../../components/Pagination.tsx";

export default function StartCaptureView() {

    const [page, setPage] = useState<number>(1);

    const {
        isPending: lidarMetadataListPending,
        error: lidarMetadataListError,
        data: lidarMetadataList,
        isSuccess
    } = useLidarMetadataList(page)

    const sensors = useSensorSelections((state) => state.sensors)
    const pcapSelections = useSensorSelections(state => state.pcapSelections)
    const rosSelections = useSensorSelections(state => state.rosSelections)
    const createSelections = useSensorSelections((state) => state.createSelections)

    useEffect(() => {
        if (!lidarMetadataListPending) {
            createSelections(lidarMetadataList!.items)
        }
    }, [isSuccess, createSelections, lidarMetadataList, lidarMetadataListPending]);

    useEffect(() => {
        console.log(pcapSelections)
    }, [pcapSelections]);

    if (lidarMetadataListPending) return <LoadingSpinner />
    if (lidarMetadataListError) return <ErrorMessage error={lidarMetadataListError} />

    return (
        <>
            <Pane minimalWidth>
                <PaneSection>
                    <p>
                        StartCaptureView
                    </p>
                    <Pagination currentPage={lidarMetadataList.page} setPage={setPage} totalItemCount={lidarMetadataList.total} pageSize={lidarMetadataList.size} />
                </PaneSection>
            </Pane>
            <Pane>
                <PaneSection>
                    <Map>

                    </Map>
                </PaneSection>
            </Pane>
        </>
    )
}