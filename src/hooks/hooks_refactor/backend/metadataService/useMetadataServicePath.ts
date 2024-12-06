import {useGatewayConfiguration} from "../../configuration/useGatewayConfiguration.ts";
import {useMemo} from "react";

export default function useMetadataServicePath() {
    const metadataServiceLocation = useGatewayConfiguration(state => state.metadataService)
    const gatewayPath = useGatewayConfiguration(state => state.gatewayPath)

    return useMemo<string>(() => {

        const cleanedPath = () => {
            if (metadataServiceLocation.path.startsWith('/')) {
                return metadataServiceLocation.path.slice(1);
            }
            return metadataServiceLocation.path;
        }
        return `${gatewayPath}:${metadataServiceLocation.port}/${cleanedPath()}`
    }, [metadataServiceLocation, gatewayPath])
}