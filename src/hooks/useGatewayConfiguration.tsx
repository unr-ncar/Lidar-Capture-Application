import {GatewayConfiguration_t} from "../types.tsx";
import {create, StoreApi, UseBoundStore} from "zustand";

export interface GatewayConfigurationState_t {
    configuration: GatewayConfiguration_t;
    metadataServiceUrl: string;
    graphqlServiceUrl: string;
    fileServiceUrl: string;
    clusterWebServerUrl: string;
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
        gateway_path: import.meta.env.VITE_GATEWAY_PATH,
        metadata_service_port: Number(import.meta.env.VITE_METADATA_SERVICE_PORT),
        graphql_service_port: Number(import.meta.env.VITE_GRAPHQL_SERVICE_PORT),
        ros_recording_service_port: Number(import.meta.env.VITE_ROS_RECORDING_SERVICE_PORT),
        pcap_recording_service_port: Number(import.meta.env.VITE_PCAP_RECORDING_SERVICE_PORT),
        file_service_port: Number(import.meta.env.VITE_FILE_SERVICE_PORT),
        cluster_web_server_port: Number(import.meta.env.VITE_CLUSTER_WEB_SERVER_PORT)
    },
    clusterWebServerUrl: `${import.meta.env.VITE_GATEWAY_PATH}:${Number(import.meta.env.VITE_CLUSTER_WEB_SERVER_PORT)}`,
    metadataServiceUrl: `${import.meta.env.VITE_GATEWAY_PATH}:${Number(import.meta.env.VITE_METADATA_SERVICE_PORT)}`,
    graphqlServiceUrl: `${import.meta.env.VITE_GATEWAY_PATH}:${Number(import.meta.env.VITE_GRAPHQL_SERVICE_PORT)}`,
    fileServiceUrl: `${import.meta.env.VITE_GATEWAY_PATH}:${Number(import.meta.env.VITE_FILE_SERVICE_PORT)}`,
    setGatewayPath: (path: string) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            gateway_path: path
        },

        metadataServiceUrl: `${path}:${state.configuration.metadata_service_port}`,
        graphqlServiceUrl: `${path}:${state.configuration.graphql_service_port}`,
        fileServiceUrl: `${path}:${state.configuration.file_service_port}`,
        clusterWebServerUrl: `${path}:${state.configuration.cluster_web_server_port}`
    })),
    setMetadataServicePort: (port: number) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            metadata_service_port: port
        },
        metadataServiceUrl: `${state.configuration.gateway_path}:${port}`,
    })),
    setGraphqlServicePort: (port: number) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            graphql_service_port: port
        },
        graphqlServiceUrl: `${state.configuration.gateway_path}:${port}`,
    })),
    setRosRecordingServicePort: (port: number) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            ros_recording_service_port: port
        }
    })),
    setPcapRecordingServicePort: (port: number) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            pcap_recording_service_port: port
        }
    })),
    setFileServicePort: (port: number) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            file_service_port: port
        }
    })),
    setClusterWebServerPort: (port: number) => set((state) => ({
        ...state,
        configuration: {
            ...state.configuration,
            cluster_web_server_port: port
        }
    })),
}))

export default useGatewayConfiguration;