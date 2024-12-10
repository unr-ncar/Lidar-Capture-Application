import {useGatewayConfiguration} from "../../configuration/useGatewayConfiguration.ts";
import {useMemo} from "react";

export type edgeRosRecordingServiceEndpointOperation = "start" | "stop" | "status";
export default function useEdgeRosRecordingServicePath(lidarIpAddress: string, endpointOperation: edgeRosRecordingServiceEndpointOperation, lidarId?: number,) {
    const edgeRosRecordingServiceLocation= useGatewayConfiguration(state => state.edgeRosRecordingService)

    const basePath = useMemo<string | null>(() => {
        const cleanedPath = () => {

            if (edgeRosRecordingServiceLocation.path === undefined) {
                return ""
            }
            if (edgeRosRecordingServiceLocation.path.startsWith('/')) {
                return edgeRosRecordingServiceLocation.path.slice(1);
            }
            return edgeRosRecordingServiceLocation.path
        }

        return `${lidarIpAddress}:${edgeRosRecordingServiceLocation.port}/${cleanedPath()}`
    }, [edgeRosRecordingServiceLocation, lidarIpAddress])

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