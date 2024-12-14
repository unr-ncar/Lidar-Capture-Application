import {create} from "zustand"
import useEnvironmentVariables from "./useEnvironmentVariables.ts";

export interface IServiceLocation {
    port: number;
    path: string;
}

export interface IGatewayConfigurationState {
    gatewayPath: string | null;
    metadataService: IServiceLocation | null;
    graphqlService: IServiceLocation | null;
    clusterWebServer: IServiceLocation | null;
    edgeRosRecordingService: IServiceLocation | null;
    edgePcapRecordingService: IServiceLocation | null;
    edgeFileService: IServiceLocation | null;
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
    metadataService: null,
    graphqlService: null,
    clusterWebServer: null,
    edgeRosRecordingService: null,
    edgePcapRecordingService: null,
    edgeFileService: null,
    setGatewayPath: (path: string | null) => set(() => ({gatewayPath: path})),
    setMetadataServiceLocation: (location: IServiceLocation | null) => set(() => ({metadataService: location})),
    setGraphqlServiceLocation: (location: IServiceLocation | null) => set(() => ({graphqlService: location})),
    setClusterWebServerLocation: (location: IServiceLocation | null) => set(() => ({clusterWebServer: location})),
    setRosRecordingServiceLocation: (location: IServiceLocation | null) => set(() => ({edgeRosRecordingService: location})),
    setPcapRecordingServiceLocation: (location: IServiceLocation | null) => set(() => ({edgePcapRecordingService: location})),
    setEdgeFileServiceLocation: (location: IServiceLocation | null) => set(() => ({edgeFileService: location}))
}))

export {useGatewayConfiguration}