import {create} from "zustand"
import useEnvironmentVariables from "./useEnvironmentVariables.ts";

export interface IServiceLocation {
    port: number;
    path: string;
}

export interface IGatewayConfigurationState {
    gatewayPath: string;
    metadataService: IServiceLocation;
    graphqlService: IServiceLocation;
    clusterWebServer: IServiceLocation;
    edgeRosRecordingService: IServiceLocation;
    edgePcapRecordingService: IServiceLocation;
    edgeFileService: IServiceLocation;
}

export interface IGatewayConfigurationAction {
    setGatewayPath: (path: IGatewayConfigurationState['gatewayPath']) => void;
    setMetadataServiceLocation: (location: IGatewayConfigurationState['metadataService']) => void;
    setGraphqlServiceLocation: (location: IGatewayConfigurationState['graphqlService']) => void;
    setClusterWebServerLocation: (location: IGatewayConfigurationState['clusterWebServer']) => void;
    setRosRecordingServiceLocation: (location: IGatewayConfigurationState['edgeRosRecordingService']) => void;
    setPcapRecordingServiceLocation: (location: IGatewayConfigurationState['edgePcapRecordingService']) => void;
    setEdgeFileServiceLocation: (location: IGatewayConfigurationState['edgeFileService']) => void;
}


const useGatewayConfiguration = create<IGatewayConfigurationState & IGatewayConfigurationAction>((set) => ({
    gatewayPath: useEnvironmentVariables().GATEWAY_PATH,
    metadataService: {
        port: useEnvironmentVariables().METADATA_SERVICE_PORT,
        path: useEnvironmentVariables().METADATA_SERVICE_PATH
    },
    graphqlService: {
        port: useEnvironmentVariables().GRAPHQL_SERVICE_PORT,
        path: useEnvironmentVariables().GRAPHQL_SERVICE_PATH,
    },
    clusterWebServer: {
        port: useEnvironmentVariables().CLUSTER_WEB_SERVER_PORT,
        path: useEnvironmentVariables().CLUSTER_WEB_SERVER_PATH
    },
    edgeRosRecordingService: {
        port: useEnvironmentVariables().EDGE_ROS_RECORDING_SERVICE_PORT,
        path: useEnvironmentVariables().EDGE_ROS_RECORDING_SERVICE_PATH
    },
    edgePcapRecordingService: {
        port: useEnvironmentVariables().EDGE_PCAP_RECORDING_SERVICE_PORT,
        path: useEnvironmentVariables().EDGE_PCAP_RECORDING_SERVICE_PATH
    },
    edgeFileService: {
        port: useEnvironmentVariables().FILE_SERVICE_PORT,
        path: useEnvironmentVariables().FILE_SERVICE_PATH
    },
    setGatewayPath: (path: string) => set(() => ({gatewayPath: path})),
    setMetadataServiceLocation: (location: IServiceLocation) => set(() => ({metadataService: location})),
    setGraphqlServiceLocation: (location: IServiceLocation) => set(() => ({graphqlService: location})),
    setClusterWebServerLocation: (location: IServiceLocation) => set(() => ({clusterWebServer: location})),
    setRosRecordingServiceLocation: (location: IServiceLocation) => set(() => ({edgeRosRecordingService: location})),
    setPcapRecordingServiceLocation: (location: IServiceLocation) => set(() => ({edgePcapRecordingService: location})),
    setEdgeFileServiceLocation: (location: IServiceLocation) => set(() => ({edgeFileService: location}))
}))

export {useGatewayConfiguration}