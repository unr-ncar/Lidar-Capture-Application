import {GatewayConfiguration_t} from "../types.tsx";
import {create, StoreApi, UseBoundStore} from "zustand";

export interface GatewayConfigurationState_t {
    configuration: GatewayConfiguration_t;
    metadataServiceUrl: string;
    graphqlServiceUrl: string;
    fileServiceUrl: string;
    setGatewayPath: (gatewayPath: string) => void;
    setMetadataServicePort: (metadataServicePort: number) => void;
    setGraphqlServicePort: (statusServicePort: number) => void;
    setRosRecordingServicePort: (rosRecordingServicePort: number) => void;
    setPcapRecordingServicePort: (pcapRecordingServicePort: number) => void;
    setFileServicePort: (fileServicePort: number) => void;
    setClusterWebServerPort: (clusterWebServerPort: number) => void;
}

const useGatewayConfiguration: UseBoundStore<StoreApi<GatewayConfigurationState_t>> = create<GatewayConfigurationState_t>()((set) => ({
    configuration: {
        gatewayPath: import.meta.env.VITE_GATEWAY_PATH,
        metadataServicePort: Number(import.meta.env.VITE_METADATA_SERVICE_PORT),
        graphqlServicePort: Number(import.meta.env.VITE_GRAPHQL_SERVICE_PORT),
        rosRecordingServicePort: Number(import.meta.env.VITE_ROS_RECORDING_SERVICE_PORT),
        pcapRecordingServicePort: Number(import.meta.env.VITE_PCAP_RECORDING_SERVICE_PORT),
        fileServicePort: Number(import.meta.env.VITE_FILE_SERVICE_PORT),
        clusterWebServerPort: Number(import.meta.env.VITE_CLUSTER_WEB_SERVER_PORT)
    },
    metadataServiceUrl: `${import.meta.env.VITE_GATEWAY_PATH}:${Number(import.meta.env.VITE_METADATA_SERVICE_PORT)}`,
    graphqlServiceUrl: `${import.meta.env.VITE_GATEWAY_PATH}:${Number(import.meta.env.VITE_GRAPHQL_SERVICE_PORT)}`,
    fileServiceUrl: `${import.meta.env.VITE_GATEWAY_PATH}:${Number(import.meta.env.VITE_FILE_SERVICE_PORT)}`,
    setGatewayPath: (path: string) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            gatewayPath: path
        },
        metadataServiceUrl: `${path}:${state.configuration.metadataServicePort}`,
        graphqlServiceUrl: `${path}:${state.configuration.graphqlServicePort}`,
        fileServiceUrl: `${path}:${state.configuration.fileServicePort}`
    })),
    setMetadataServicePort: (port: number) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            metadataServicePort: port
        },
        metadataServiceUrl: `${state.configuration.gatewayPath}:${port}`,
    })),
    setGraphqlServicePort: (port: number) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            graphqlServicePort: port
        },
        graphqlServiceUrl: `${state.configuration.gatewayPath}:${port}`,
    })),
    setRosRecordingServicePort: (port: number) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            rosRecordingServicePort: port
        }
    })),
    setPcapRecordingServicePort: (port: number) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            pcapRecordingServicePort: port
        }
    })),
    setFileServicePort: (port: number) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            fileServicePort: port
        }
    })),
    setClusterWebServerPort: (port: number) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            clusterWebServerPort: port
        }
    })),
}))

export default useGatewayConfiguration;