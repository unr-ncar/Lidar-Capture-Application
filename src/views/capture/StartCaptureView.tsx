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
import {SensorSelectionItem} from "../../components/SensorSelectionItem.tsx";

export default function StartCaptureView() {

    const [page, setPage] = useState<number>(1);
    const selections = useSensorSelections((state) => state.selections)
    const createSelections = useSensorSelections((state) => state.createSelections)
    const isSelected = useSensorSelections((state) => state.isSelected)
    const toggleSelection = useSensorSelections((state) => state.toggleSelection)

    const {
        isPlaceholderData: isPlaceholderLidarMetadataList,
        error: lidarMetadataListError,
        data: lidarMetadataList,
    } = useLidarMetadataList(page)

    useEffect(() => {
        if (!isPlaceholderLidarMetadataList) {
            createSelections(lidarMetadataList!.items)
        }
    }, [createSelections, lidarMetadataList, isPlaceholderLidarMetadataList]);

    useEffect(() => {
        console.log(selections)
    }, [selections]);

    if (lidarMetadataListError) return <ErrorMessage error={lidarMetadataListError}/>
    if (isPlaceholderLidarMetadataList) return <LoadingSpinner/>

    const rosSensorSelections = lidarMetadataList!.items.map((selectionItem) => {
        return <SensorSelectionItem key={selectionItem.lidar_id} selected={() => isSelected(selectionItem.lidar_id, "ros")} toggleFunction={() => toggleSelection(selectionItem.lidar_id, "ros")} format="ros" lidarMetadata={selectionItem} />
    })

    const pcapSensorSelections = lidarMetadataList!.items.map((selectionItem) => {
        return <SensorSelectionItem key={selectionItem.lidar_id} selected={() => isSelected(selectionItem.lidar_id, "pcap")} toggleFunction={() => toggleSelection(selectionItem.lidar_id, "pcap")} format="pcap" lidarMetadata={selectionItem} />
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
                            <Pagination currentPage={lidarMetadataList!.page} setPage={setPage} totalItemCount={lidarMetadataList!.total} pageSize={lidarMetadataList!.size} />
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