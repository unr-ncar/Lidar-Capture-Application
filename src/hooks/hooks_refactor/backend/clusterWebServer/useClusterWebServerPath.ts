import {useGatewayConfiguration} from "../../configuration/useGatewayConfiguration.ts";
import {useMemo} from "react";

export default function useClusterWebServerPath() {
    const clusterWebServerLocation = useGatewayConfiguration(state => state.clusterWebServer)
    const gatewayPath = useGatewayConfiguration(state => state.gatewayPath)

    return useMemo<string | null>(() => {
        if (!clusterWebServerLocation || !gatewayPath) return null

        const cleanedPath = () => {
            if (clusterWebServerLocation.path.startsWith('/')) {
                return clusterWebServerLocation.path.slice(1);
            }
            return clusterWebServerLocation.path
        }

        return `${gatewayPath}:${clusterWebServerLocation.port}/${cleanedPath()}`
    }, [clusterWebServerLocation, gatewayPath])
}