import {GatewayConfiguration_t} from "../types.tsx";
import {create} from "zustand";

export interface GatewayConfigurationState_t {
    configuration: GatewayConfiguration_t;
    setGatewayPath: (gatewayPath: string) => void;
    setMetadataServicePort: (metadataServicePort: number) => void;
    setGraphqlServicePort: (statusServicePort: number) => void;
    setRosRecordingServicePort: (rosRecordingServicePort: number) => void;
    setPcapRecordingServicePort: (pcapRecordingServicePort: number) => void;
}

const defaultApplicationConfiguration: GatewayConfiguration_t = {
    gatewayPath: import.meta.env.VITE_GATEWAY_PATH,
    metadataServicePort: Number(import.meta.env.VITE_METADATA_SERVICE_PORT),
    graphqlServicePort: Number(import.meta.env.VITE_GRAPHQL_SERVICE_PORT),
    rosRecordingServicePort: Number(import.meta.env.VITE_ROS_RECORDING_SERVICE_PORT),
    pcapRecordingServicePort: Number(import.meta.env.VITE_PCAP_RECORDING_SERVICE_PORT)
}

export default function useGatewayConfiguration() {
    return create<GatewayConfigurationState_t>()((set) => ({
        configuration: defaultApplicationConfiguration,
        setGatewayPath: (path: string) => set((state) => ({
            configuration: {
                ...state.configuration,
                gatewayPath: path
            }
        })),
        setMetadataServicePort: (port: number) => set((state) => ({
            configuration: {
                ...state.configuration,
                metadataServicePort: port
            }
        })),
        setGraphqlServicePort: (port: number) => set((state) => ({
            configuration: {
                ...state.configuration,
                graphqlServicePort: port
            }
        })),
        setRosRecordingServicePort: (port: number) => set((state) => ({
            configuration: {
                ...state.configuration,
                rosRecordingServicePort: port
            }
        })),
        setPcapRecordingServicePort: (port: number) => set((state) => ({
            configuration: {
                ...state.configuration,
                pcapRecordingServicePort: port
            }
        }))
    }))
}