import {Pane} from "../../components/Pane.tsx";
import {PaneSection} from "../../components/PaneSection.tsx";
import useSiteMetadata from "../../hooks/useSiteMetadata.tsx";
import {useParams} from "react-router-dom";
import {Map} from "../../components/map/Map.tsx";
import {GeographicMarker} from "../../components/map/GeographicMarker.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import {Descriptor} from "../../components/Descriptor.tsx";
import ItemList from "../../components/ItemList.tsx";
import {useStatus} from "../../hooks/useStatus.tsx";
import {useMemo} from "react";
import {StatusMetadata_t} from "../../types.tsx";
import {RosServiceWidget} from "../../components/service_widget/RosServiceWidget.tsx";
import useStorageStatusLabel from "../../hooks/useStorageStatusLabel.tsx";

export default function SiteMetadataView() {

    const {site_id} = useParams();
    const {isPending: siteMetadataPending, error: siteMetadataError, data} = useSiteMetadata(Number(site_id));
    const {isPending: statusPending, error: statusError, data: status} = useStatus({
        siteId: Number(site_id),
        fileInformationIncluded: true
    })

    const storageMetrics = useMemo(() => {
        if (statusPending || statusError) return undefined
        if (status?.edgeStorageStatus === undefined) return undefined

        function makeBytesReadable(bytes: number) {
            return `${(Number(bytes) / Math.pow(1024, 3)).toFixed(2)} GB (${bytes} bytes)`
        }

        const totalCapacity = makeBytesReadable(status!.edgeStorageStatus!.totalSpace)
        const usedCapacity = makeBytesReadable(status!.edgeStorageStatus!.usedSpace)
        const availableCapacity = makeBytesReadable(status!.edgeStorageStatus!.freeSpace)
        const usedStoragePercentage = 100 * Number((status!.edgeStorageStatus!.usedSpace / status!.edgeStorageStatus!.totalSpace).toFixed(4))

        return {
            totalCapacity: totalCapacity,
            usedCapacity: usedCapacity,
            availableCapacity: availableCapacity,
            usedStoragePercentage: usedStoragePercentage
        }

    }, [status, statusError, statusPending])

    const storageStatusLabel = useStorageStatusLabel(status?.edgeStorageStatus)

    const pcapServicesStatus = useMemo(() => {
        if (statusPending || statusError) return undefined

        return status?.pcapServiceStatus.map((sensorStatus: StatusMetadata_t) => {
            return (
                <RosServiceWidget key={sensorStatus.lidarId} up={sensorStatus!.up }
                                  isRecording={sensorStatus!.isRecording }
                                  start={sensorStatus!.start}
                                  elapsed={sensorStatus!.elapsed}
                                  lidarId={Number(sensorStatus!.lidarId)} />
            )
        })
    }, [status?.pcapServiceStatus, statusError, statusPending])

    const rosServicesStatus = useMemo(() => {
        if (statusPending || statusError) return undefined

        return status?.rosServiceStatus.map((sensorStatus: StatusMetadata_t) => {
            return (
                <RosServiceWidget key={sensorStatus.lidarId} up={sensorStatus!.up }
                                  isRecording={sensorStatus!.isRecording }
                                  start={sensorStatus!.start}
                                  elapsed={sensorStatus!.elapsed}
                                  lidarId={Number(sensorStatus!.lidarId)} />
            )
        })
    }, [status?.rosServiceStatus, statusError, statusPending])

    const metadataItems = !siteMetadataPending && !siteMetadataError ? Object.entries(data?.siteMetadata).filter(([key, value]) => {
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


    if (siteMetadataPending) return <LoadingSpinner/>
    if (siteMetadataError) return <ErrorMessage error={siteMetadataError}/>

    return (
        <>
            <Pane minimalWidth>
                <PaneSection label="Site Metadata" description="View metadata related to a site deployment.">
                    <ItemList>
                        {metadataItems}
                    </ItemList>
                </PaneSection>
                <PaneSection label="Sensors Status" description="View status of sensors attached to site deployment.">
                    { statusPending ? <LoadingSpinner /> : !statusError ? (
                        <ItemList>
                            <ItemList label="PCAP Service">
                                {pcapServicesStatus}
                            </ItemList>
                            <ItemList label="ROS Service">
                                {rosServicesStatus}
                            </ItemList>
                        </ItemList>
                    ) : <ErrorMessage error={statusError} />}
                </PaneSection>
                <PaneSection label="Storage Metrics" description="View overall site deployment storage metrics and recordings awaiting transfer to central cluster's database.">
                    { statusPending ? <LoadingSpinner /> : !statusError ? status?.edgeStorageStatus !== undefined ? (
                        <ItemList>
                            <ItemList>
                                <Descriptor label="Total Capacity">
                                    {storageMetrics!.totalCapacity}
                                </Descriptor>
                                <Descriptor label="Used Capacity">
                                    {storageMetrics!.usedCapacity}
                                </Descriptor>
                                <Descriptor label="Available Capacity">
                                    {storageMetrics!.availableCapacity}
                                </Descriptor>
                                <Descriptor label="Capacity Status">
                                    {storageStatusLabel.toUpperCase()} ({String(storageMetrics!.usedStoragePercentage)}% Used)
                                </Descriptor>

                            </ItemList>
                            <ItemList label="PCAP Service">
                                {pcapServicesStatus}
                            </ItemList>
                            <ItemList label="ROS Service">
                                {rosServicesStatus}
                            </ItemList>
                        </ItemList>
                    ) : <><ErrorMessage error={new Error("Storage metrics are not responding at this time")} /> </> : <ErrorMessage error={statusError} /> }
                </PaneSection>
            </Pane>
            <Pane stretch>
                <PaneSection fillHeight>
                    <Map mapCenter={[data!.siteMetadata.latitude, data!.siteMetadata.longitude]} className='min-h-[350px] min-h-auto'>
                        <GeographicMarker center={[data!.siteMetadata.latitude, data!.siteMetadata.longitude]} />
                    </Map>
                </PaneSection>
            </Pane>
        </>
    )
}