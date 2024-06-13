import {PaneSection} from "../../components/PaneSection.tsx";
import {Pane} from "../../components/Pane.tsx";
import {Map} from "../../components/map/Map.tsx";
import {useEffect, useState} from "react";
import useLidarMetadataList from "../../hooks/useLidarMetadataList.tsx";
import useSensorSelections from "../../hooks/useSensorSelections.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {Pagination} from "../../components/Pagination.tsx";
import ItemList from "../../components/ItemList.tsx";

export default function StartCaptureView() {

    const [page, setPage] = useState<number>(1);

    const {
        isPending: lidarMetadataListPending,
        error: lidarMetadataListError,
        data: lidarMetadataList,
        isSuccess
    } = useLidarMetadataList(page)

    const selections = useSensorSelections(state => state.selections)
    const createSelections = useSensorSelections((state) => state.createSelections)

    useEffect(() => {
        if (!lidarMetadataListPending) {
            createSelections(lidarMetadataList!.items)
        }
    }, [isSuccess, createSelections, lidarMetadataList, lidarMetadataListPending]);

    useEffect(() => {
        console.log(selections)
    }, [selections]);

    if (lidarMetadataListPending) return <LoadingSpinner />
    if (lidarMetadataListError) return <ErrorMessage error={lidarMetadataListError} />

    return (
        <>
            <Pane minimalWidth>
                <PaneSection>
                    <ItemList accordion label='ROS SELECTIONS'>
                        <p>
                            Hello
                        </p>
                        <p>
                            World
                        </p>
                    </ItemList>
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