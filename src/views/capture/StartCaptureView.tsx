import { PaneSection } from "../../components/PaneSection.tsx";
import { Pane } from "../../components/Pane.tsx";
import {useEffect, useMemo, useState} from "react";
import useLidarMetadataList from "../../hooks/useLidarMetadataList.tsx";
import useSensorSelections from "../../hooks/useSensorSelections.tsx";
import { ErrorMessage } from "../../components/utilities/ErrorMessage.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import { Pagination } from "../../components/Pagination.tsx";
import ItemList from "../../components/ItemList.tsx";
import { SensorSelectionItem } from "../../components/SensorSelectionItem.tsx";
import {LidarMetadata_t, LidarSelection_t, RecordingServiceActionResponse_t} from "../../types.tsx";
import { Map } from "../../components/map/Map.tsx";
import { ActionItem } from "../../components/ActionItem.tsx";
import {FormGroup} from "../../components/forms/FormGroup.tsx";
import CheckboxForm from "../../components/forms/CheckboxForm.tsx";
import Button from "../../components/Button.tsx";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import useGatewayConfiguration from "../../hooks/useGatewayConfiguration.tsx";

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
  const clearSensorSelections = useSensorSelections((state) => state.clearSelections)
  const [storageStatusOverride, setStorageStatusOverride] = useState<boolean>(false)
  const [sensorStatusOverride, setSensorStatusOverride] = useState<boolean>(false)

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

  useEffect(() => {
    if (sensorStatusOverride || storageStatusOverride) {
      clearSensorSelections()
    }
  }, [clearSensorSelections, sensorStatusOverride, storageStatusOverride]);

  const gatewayPath = useGatewayConfiguration((state) => state.configuration.gateway_path);
  const rosRecordingPort = useGatewayConfiguration((state) => state.configuration.ros_recording_service_port)
  const pcapRecordingPort = useGatewayConfiguration((state) => state.configuration.pcap_recording_service_port)
  const {isPending, isError, mutate} = useMutation({
    mutationKey: ['start_capture', selections],
    mutationFn: async () => {

      interface ActionResult_t {
        lidarId: number;
        ros: RecordingServiceActionResponse_t | undefined;
        pcap: RecordingServiceActionResponse_t | undefined;
      }
      const results: Array<ActionResult_t> = []

      selections.forEach((selectionItem: LidarSelection_t) => {
        const resultItem: ActionResult_t = {
          lidarId: selectionItem.item.lidar_id,
          ros: undefined,
          pcap: undefined
        }
        selectionItem.selectedFormats.forEach((format) => {
          if (format === "pcap") {
            console.log(`${gatewayPath}:${pcapRecordingPort}/start/${selectionItem.item.lidar_id}`)
            axios.get(`${gatewayPath}:${pcapRecordingPort}/start/${selectionItem.item.lidar_id}`).then((response) => {
              resultItem.pcap = response.data;
            })
          }
          if (format === "ros") {
            axios.get(`${gatewayPath}:${rosRecordingPort}/start/${selectionItem.item.lidar_id}`).then((response) => {
              resultItem.ros = response.data;
            })
          }
        })
        results.push(resultItem)
      })

      return results;
    }
  })

  const activeSelectionsCount = useMemo<number>(() => {
    let activeCount = 0;
    selections.forEach((selectionItem: LidarSelection_t) => {
      if (selectionItem.selectedFormats.length > 0) activeCount += 1
    })

    return activeCount;
  }, [selections]);

  if (lidarMetadataListError)
    return <ErrorMessage error={lidarMetadataListError} />;
  if (isPlaceholderLidarMetadataList) return <LoadingSpinner />;

  const rosSensorSelections = displayedSelections.map((selectionItem) => {
    return (
      <SensorSelectionItem
        key={selectionItem.item.lidar_id}
        sensorStatusOverride={sensorStatusOverride}
        storageStatusOverride={storageStatusOverride}
        operation="start"
        selected={isSelected(selectionItem.item.lidar_id, "ros")}
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
        sensorStatusOverride={sensorStatusOverride}
        storageStatusOverride={storageStatusOverride}
        operation="start"
        selected={isSelected(selectionItem.item.lidar_id, "pcap")}
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
        <PaneSection>
          <FormGroup label="Status Override">
            <CheckboxForm checked={storageStatusOverride} onChange={setStorageStatusOverride} description="Enable selection of LIDARs for recording services regardless of edge storage status." label="Storage Status" />
            <CheckboxForm checked={sensorStatusOverride} onChange={setSensorStatusOverride} description="Enable selection of LIDARs for recording services regardless of a sensors current status (e.g. offline, recording, disabled)." label="Sensor Status" />
          </FormGroup>
        </PaneSection>
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
          <div className='flex flex-col gap-4'>
          <ItemList>
            {
              selections.map((selection) => {
                return <ActionItem key={selection.item.lidar_id} {...selection} />
              })
            }
          </ItemList>
          <div className='flex flex-row'>
            {
                (activeSelectionsCount > 0) && (
                    <Button className={'disabled:cursor-wait'} onClick={() => mutate()} disabled={isPending} label={isPending ? 'Working...' : 'Start Capture'} />
                )
            }
          </div>
        </div>
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
