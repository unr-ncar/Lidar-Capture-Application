import {Pane} from "../../components/Pane.tsx";
import {PaneSection} from "../../components/PaneSection.tsx";
import {useFileMetadata} from "../../hooks/useFileMetadata.tsx";
import {useParams} from "react-router-dom";
import {Descriptor} from "../../components/Descriptor.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import ItemList from "../../components/ItemList.tsx";
import {useMemo} from "react";
import useGatewayConfiguration from "../../hooks/useGatewayConfiguration.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import {Map} from "../../components/map/Map.tsx";
import useLidarMetadata from "../../hooks/useLidarMetadata.tsx";
import {FileOriginMarker} from "../../components/map/FileOriginMarker.tsx";

export default function FileMetadataView() {

    const clusterWebServerUrl = useGatewayConfiguration((state) => state.clusterWebServerUrl)
    const { fileName, lidarId} = useParams();
    const {isPending: lidarMetadataPending, error: lidarMetadataError, data: lidarMetadata} = useLidarMetadata(Number(lidarId))
    const {isPending: fileQueryPending, error: fileQueryError, data: fileQuery} = useFileMetadata(String(fileName))

    const humanReadableValues = useMemo(() => {

        if (!fileQuery) {
            return {
                file_size: undefined,
                datetime: undefined,
                path: undefined
            }
        }

        const humanFileSize = `${(Number(fileQuery?.file_size) / Math.pow(1024, 3)).toFixed(2)} GB (${fileQuery?.file_size} bytes)`
        const humanDateTime = new Date(fileQuery?.datetime * 1000).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        });
        const filePath = `${clusterWebServerUrl}/${fileQuery?.path}${fileName}`

        return {
            file_size: humanFileSize,
            datetime: humanDateTime,
            path: filePath
        }

    }, [clusterWebServerUrl, fileQuery, fileName])

    if (fileQueryPending || lidarMetadataPending) return <LoadingSpinner />
    if (fileQueryError || lidarMetadataError) return <ErrorMessage error={fileQueryError || lidarMetadataError}/>

    return (
        <>
            <Pane minimalWidth>
                <PaneSection label="File Metadata" description="View metadata related to a file query.">
                    <div className='md:max-w-[300px]'>
                        <ItemList>
                            <Descriptor label="FILE NAME">
                                {fileQuery!.filename}
                            </Descriptor>
                            <Descriptor label="FILE SIZE">
                                {String(humanReadableValues!.file_size)}
                            </Descriptor>
                            <Descriptor label="FILE PATH" href={humanReadableValues!.path}>
                                {String(humanReadableValues!.path)}
                            </Descriptor>
                            <Descriptor label="CREATION DATE" href={humanReadableValues!.path}>
                                {String(humanReadableValues!.datetime)}
                            </Descriptor>
                            <Descriptor label="LIDAR ID">
                                {fileQuery!.lidar_id}
                            </Descriptor>
                            <Descriptor label="SITE ID">
                                {fileQuery!.site_id}
                            </Descriptor>
                            <Descriptor label="DEPLOYMENT ID">
                                {fileQuery!.deployment_id}
                            </Descriptor>
                            <Descriptor label="STREET">
                                {fileQuery!.street}
                            </Descriptor>
                            <Descriptor label="CROSS STREET">
                                {fileQuery!.crossstreet}
                            </Descriptor>
                            <Descriptor label="CORNER">
                                {fileQuery!.corner}
                            </Descriptor>
                            <Descriptor label="CITY">
                                {fileQuery!.city}
                            </Descriptor>
                            <Descriptor label="STATE">
                                {fileQuery!.state}
                            </Descriptor>
                        </ItemList>
                    </div>
                </PaneSection>
            </Pane>
            <Pane stretch>
                <PaneSection fillHeight>
                    <Map mapCenter={[lidarMetadata!.latitude, lidarMetadata!.longitude]} className='min-h-[350px] min-h-auto'>
                        <FileOriginMarker center={[lidarMetadata!.latitude, lidarMetadata!.longitude]} />
                    </Map>
                </PaneSection>
            </Pane>
        </>
    )
}