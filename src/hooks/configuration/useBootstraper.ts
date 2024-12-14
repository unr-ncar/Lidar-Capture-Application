import { useEffect, useState } from "react";
import useEnvironmentVariables, { IEnvironmentVariables } from "./useEnvironmentVariables";
import { useGatewayConfiguration } from "./useGatewayConfiguration";

export default function useBootstraper() {

    const [isBootstrapped, setIsBootstrapped] = useState<boolean>(false);

    const {
        GATEWAY_PATH,
        METADATA_SERVICE_PORT,
        METADATA_SERVICE_PATH,
        GRAPHQL_SERVICE_PORT,
        GRAPHQL_SERVICE_PATH,
        EDGE_ROS_RECORDING_SERVICE_PORT,
        EDGE_ROS_RECORDING_SERVICE_PATH,
        EDGE_PCAP_RECORDING_SERVICE_PORT,
        EDGE_PCAP_RECORDING_SERVICE_PATH,
        FILE_SERVICE_PORT,
        FILE_SERVICE_PATH,
        CLUSTER_WEB_SERVER_PORT,
        CLUSTER_WEB_SERVER_PATH,
    }: IEnvironmentVariables = useEnvironmentVariables();
    const setGatewayPath = useGatewayConfiguration(state => state.setGatewayPath);
    const setMetadataServiceLocation = useGatewayConfiguration(state => state.setMetadataServiceLocation);
    const setGraphqlServiceLocation = useGatewayConfiguration(state => state.setGraphqlServiceLocation);
    const setClusterWebServerLocation = useGatewayConfiguration(state => state.setClusterWebServerLocation);
    const setRosRecordingServiceLocation = useGatewayConfiguration(state => state.setRosRecordingServiceLocation);
    const setPcapRecordingServiceLocation = useGatewayConfiguration(state => state.setPcapRecordingServiceLocation);
    const setEdgeFileServiceLocation = useGatewayConfiguration(state => state.setEdgeFileServiceLocation);

    const bootstrapGatewayConfiguration = () => {
        setGatewayPath(GATEWAY_PATH);
        setMetadataServiceLocation({
            port: METADATA_SERVICE_PORT,
            path: METADATA_SERVICE_PATH
        })
        setGraphqlServiceLocation({
            port: GRAPHQL_SERVICE_PORT,
            path: GRAPHQL_SERVICE_PATH
        })
        setClusterWebServerLocation({
            port: CLUSTER_WEB_SERVER_PORT,
            path: CLUSTER_WEB_SERVER_PATH
        })
        setRosRecordingServiceLocation({
            port: EDGE_ROS_RECORDING_SERVICE_PORT,
            path: EDGE_ROS_RECORDING_SERVICE_PATH
        })
        setPcapRecordingServiceLocation({
            port: EDGE_PCAP_RECORDING_SERVICE_PORT,
            path: EDGE_PCAP_RECORDING_SERVICE_PATH
        })
        setEdgeFileServiceLocation({
            port: FILE_SERVICE_PORT,
            path: FILE_SERVICE_PATH
        })

        setIsBootstrapped(true)
    }

    useEffect(() => {
        bootstrapGatewayConfiguration();
    }, [])

    return isBootstrapped;

}