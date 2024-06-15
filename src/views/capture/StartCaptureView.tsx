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
import useBulkStatus from "../../hooks/useBulkStatus.tsx";
import getSiteIds from "../../functions/getSiteIds.tsx";
import {SensorSelectionItem} from "../../components/SensorSelectionItem.tsx";
import getLidarStatus from "../../functions/getLidarStatus.tsx";

export default function StartCaptureView() {

    const [page, setPage] = useState<number>(1);
    const selections = useSensorSelections(state => state.selections)
    const createSelections = useSensorSelections((state) => state.createSelections)
    const isSelected = useSensorSelections((state) => state.isSelected)
    const toggleSelection = useSensorSelections((state) => state.toggleSelection)


    const {
        isPending: lidarMetadataListPending,
        error: lidarMetadataListError,
        data: lidarMetadataList,
        isSuccess
    } = useLidarMetadataList(page)

    useEffect(() => {
        if (!lidarMetadataListPending) {
            createSelections(lidarMetadataList!.items)
        }
    }, [isSuccess, createSelections, lidarMetadataList, lidarMetadataListPending]);

    useEffect(() => {
        console.log(selections)
    }, [selections]);

    if (lidarMetadataListError) return <ErrorMessage error={lidarMetadataListError}/>
    if (lidarMetadataListPending) return <LoadingSpinner/>

    const rosSensorSelections = selections.map((selectionItem) => {
        return <SensorSelectionItem key={selectionItem.item.lidar_id} selected={isSelected(selectionItem, "ros")} toggleFunction={() => toggleSelection(selectionItem, "ros")} format="ros" lidarSelection={selectionItem} />
    })

    const pcapSensorSelections = selections.map((selectionItem) => {
        return <SensorSelectionItem key={selectionItem.item.lidar_id} selected={isSelected(selectionItem, "pcap")} toggleFunction={() => toggleSelection(selectionItem, "pcap")} format="pcap" lidarSelection={selectionItem} />
    })

    return (
        <>
            <Pane minimalWidth>
                <PaneSection>
                    <div className='md:w-[300px]'>
                        <ItemList>
                            <ItemList label="ros selections" accordion>
                                {rosSensorSelections}
                            </ItemList>
                            <ItemList label="pcap selections" accordion>
                                {pcapSensorSelections}
                            </ItemList>
                            <Pagination currentPage={lidarMetadataList.page} setPage={setPage} totalItemCount={lidarMetadataList.total} pageSize={lidarMetadataList.size} />
                        </ItemList>
                    </div>
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