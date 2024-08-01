import { PaneSection } from "../../components/PaneSection.tsx";
import { Pane } from "../../components/Pane.tsx";
import { useEffect, useState } from "react";
import useLidarMetadataList from "../../hooks/useLidarMetadataList.tsx";
import useSensorSelections from "../../hooks/useSensorSelections.tsx";
import { ErrorMessage } from "../../components/utilities/ErrorMessage.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import { Pagination } from "../../components/Pagination.tsx";
import ItemList from "../../components/ItemList.tsx";
import { SensorSelectionItem } from "../../components/SensorSelectionItem.tsx";
import { LidarMetadata_t, LidarSelection_t } from "../../types.tsx";
import { Map } from "../../components/map/Map.tsx";
import { ActionItem } from "../../components/ActionItem.tsx";

export default function StartCaptureView() {
  const [page, setPage] = useState<number>(1);
  const [displayedSelections, setDisplayedSelections] = useState<
    Array<LidarSelection_t>
  >([]);
  const selections = useSensorSelections((state) => state.selections);
  const createSelections = useSensorSelections(
    (state) => state.createSelections,
  );
  const isSelected = useSensorSelections((state) => state.isSelected);
  const toggleSelection = useSensorSelections((state) => state.toggleSelection);

  const {
    isPlaceholderData: isPlaceholderLidarMetadataList,
    error: lidarMetadataListError,
    data: lidarMetadataList,
  } = useLidarMetadataList(page);

  useEffect(() => {
    if (!isPlaceholderLidarMetadataList) {
      createSelections(lidarMetadataList!.items);
    }
  }, [createSelections, lidarMetadataList, isPlaceholderLidarMetadataList]);

  useEffect(() => {
    if (!isPlaceholderLidarMetadataList) {
      setDisplayedSelections(() => {
        return selections.filter((selectionItem: LidarSelection_t) => {
          return lidarMetadataList!.items.find(
            (metadataItem: LidarMetadata_t) =>
              selectionItem.item.lidar_id === metadataItem.lidar_id,
          );
        });
      });
    }
  }, [isPlaceholderLidarMetadataList, lidarMetadataList, selections]);

  if (lidarMetadataListError)
    return <ErrorMessage error={lidarMetadataListError} />;
  if (isPlaceholderLidarMetadataList) return <LoadingSpinner />;

  const rosSensorSelections = displayedSelections.map((selectionItem) => {
    return (
      <SensorSelectionItem
        key={selectionItem.item.lidar_id}
        operation="start"
        selected={() => isSelected(selectionItem.item.lidar_id, "ros")}
        toggleFunction={() =>
          toggleSelection(selectionItem.item.lidar_id, "ros")
        }
        format="ros"
        lidarMetadata={selectionItem.item}
      />
    );
  });

  const pcapSensorSelections = displayedSelections.map((selectionItem) => {
    return (
      <SensorSelectionItem
        key={selectionItem.item.lidar_id}
        operation="start"
        selected={() => isSelected(selectionItem.item.lidar_id, "pcap")}
        toggleFunction={() =>
          toggleSelection(selectionItem.item.lidar_id, "pcap")
        }
        format="pcap"
        lidarMetadata={selectionItem.item}
      />
    );
  });

  return (
    <>
      <Pane minimalWidth>
        <PaneSection
          label="Sensor Selections for New Capture Job"
          description="Select which sensors and their respective capture services for a new capture job."
        >
          <div>
            <ItemList>
              <ItemList label="ros selections">{rosSensorSelections}</ItemList>
              <ItemList label="pcap selections">
                {pcapSensorSelections}
              </ItemList>
              <Pagination
                currentPage={lidarMetadataList!.page}
                setPage={setPage}
                totalItemCount={lidarMetadataList!.total}
                pageSize={lidarMetadataList!.size}
              />
            </ItemList>
          </div>
        </PaneSection>
      </Pane>
      <Pane minimalWidth>
        <PaneSection
          label="Capture Action Summary"
          description="View a summary of sensor selections and respective outputs for a new capture job submission."
        >
          <ItemList>
            <ActionItem />
          </ItemList>
        </PaneSection>
      </Pane>
      <Pane stretch>
        <PaneSection fillHeight>
          <Map className='min-h-[300px]'>
          </Map>
        </PaneSection>
      </Pane>
    </>
  );
}
