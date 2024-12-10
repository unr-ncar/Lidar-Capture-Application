import {useGatewayConfiguration} from "../../configuration/useGatewayConfiguration.ts";
import {useMemo} from "react";

export type edgePcapRecordingServiceEndpointOperation = "start" | "stop" | "status";
export default function useEdgePcapRecordingServicePath(lidarIpAddress: string, endpointOperation: edgePcapRecordingServiceEndpointOperation, lidarId?: number,) {
    const edgePcapRecordingServiceLocation= useGatewayConfiguration(state => state.edgePcapRecordingService)

    const basePath = useMemo<string | null>(() => {
        const cleanedPath = () => {

            if (edgePcapRecordingServiceLocation.path === undefined) {
                return ""
            }
            if (edgePcapRecordingServiceLocation.path.startsWith('/')) {
                return edgePcapRecordingServiceLocation.path.slice(1);
            }
            return edgePcapRecordingServiceLocation.path
        }

        return `${lidarIpAddress}:${edgePcapRecordingServiceLocation.port}/${cleanedPath()}`
    }, [edgePcapRecordingServiceLocation, lidarIpAddress])

    const controlPath = useMemo<string>(() => {
        if (endpointOperation === "start" && lidarId) {
            return `start/${lidarId}`
        } else if (endpointOperation === "stop" && lidarId) {
            return `stop/${lidarId}`
        } else if (endpointOperation === "status") {
            return `status`
        } else {
            throw new Error(`Unknown or incomplete endpoint operation: (param: endpointOperation) - ${endpointOperation}, (param: lidarId) - ${lidarId}`)
        }
    }, [endpointOperation, lidarId])

    return `${basePath}/${controlPath}`.replace(/\/+/g, '/');

}