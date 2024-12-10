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
    gatewayPath: "",
    metadataService: {
        port: 0,
        path: ""
    },
    graphqlService: {
        port: 0,
        path: "",
    },
    clusterWebServer: {
        port: 0,
        path: "",
    },
    edgeRosRecordingService: {
        port: 0,
        path: ""
    },
    edgePcapRecordingService: {
        port: useEnvironmentVariables().EDGE_PCAP_RECORDING_SERVICE_PORT,
        path: useEnvironmentVariables().EDGE_PCAP_RECORDING_SERVICE_PATH
    },
    edgeFileService: {
        port: 0,
        path: ""
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