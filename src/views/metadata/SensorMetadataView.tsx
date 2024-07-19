import {Pane} from "../../components/Pane.tsx";
import {PaneSection} from "../../components/PaneSection.tsx";
import useLidarMetadata from "../../hooks/useLidarMetadata.tsx";
import {useParams} from "react-router-dom";
import {Descriptor} from "../../components/Descriptor.tsx";
import ItemList from "../../components/ItemList.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import {useStatus} from "../../hooks/useStatus.tsx";
import {RosServiceWidget} from "../../components/service_widget/RosServiceWidget.tsx";
import {PcapServiceWidget} from "../../components/service_widget/PcapServiceWidget.tsx";
import {ReactElement, useMemo} from "react";
import {Map} from "../../components/map/Map.tsx";
import {GeographicMarker} from "../../components/map/GeographicMarker.tsx";

export default function SensorMetadataView() {

    const {lidar_id, site_id} = useParams();
    const {
        isPending: lidarMetadataPending,
        error: lidarMetadataError,
        data: lidarMetadata
    } = useLidarMetadata(Number(lidar_id))
    const {isPending: statusPending, error: statusError, data: status} = useStatus(Number(lidar_id), Number(site_id));

    const statusServiceWidgets = useMemo<ReactElement | Array<ReactElement>>(() => {
        if (statusPending) return <LoadingSpinner />
        if (!statusPending && !statusError) return (
            <ItemList>
                <RosServiceWidget up={status!.rosServiceStatus.up }
                                  isRecording={status!.rosServiceStatus.isRecording }
                                  start={status!.rosServiceStatus.start}
                                  elapsed={status!.rosServiceStatus.elapsed}
                                  lidarId={Number(lidar_id)}
                                  minified />
                <PcapServiceWidget up={status!.pcapServiceStatus.up }
                                   isRecording={status!.pcapServiceStatus.isRecording }
                                   start={status!.pcapServiceStatus.start}
                                   elapsed={status!.pcapServiceStatus.elapsed}
                                   lidarId={Number(lidar_id)}
                                   minified />
            </ItemList>
        )
        return <ErrorMessage error={statusError} />
    }, [lidar_id, status, statusError, statusPending])

    const metadataItems = !lidarMetadataPending && !lidarMetadataError ? Object.entries(lidarMetadata).filter(([key, value]) => {
        if (key === "_id") return
        if (key === "intersection_center") return
        return {key: value}
    }).map(([key, value]) => {
        return (
            <Descriptor key={key} label={key.replace(/_/g, " ")}>
                {String(value)}
            </Descriptor>
        )
    }) : undefined;

    if (lidarMetadataPending) return <LoadingSpinner/>
    if (lidarMetadataError) return <ErrorMessage error={lidarMetadataError}/>

    return (
        <>
            <Pane minimalWidth>
                <PaneSection label="Sensor Metadata" description="View metadata related to a LiDAR sensor.">
                    <div className='md:max-w-[300px] md:w-[300px]'>
                        <ItemList>
                            {metadataItems}
                        </ItemList>
                    </div>
                </PaneSection>
                <PaneSection label="Sensor Status" description="View current status of LiDAR sensors such if the sensor is recording, ready, or unavailable.">
                    {statusServiceWidgets}
                </PaneSection>
            </Pane>
            <Pane stretch>
                <PaneSection fillHeight>
                    <Map mapCenter={[lidarMetadata!.latitude, lidarMetadata!.longitude]} className='min-h-[350px] min-h-auto'>
                        <GeographicMarker center={[lidarMetadata!.latitude, lidarMetadata!.longitude]} />
                    </Map>
                </PaneSection>
            </Pane>
        </>
    )
}