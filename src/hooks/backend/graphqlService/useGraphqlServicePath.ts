import {useGatewayConfiguration} from "../../configuration/useGatewayConfiguration.ts";
import {useMemo} from "react";

export default function useGraphqlServicePath() {
    const graphqlServiceLocation = useGatewayConfiguration(state => state.graphqlService)
    const gatewayPath = useGatewayConfiguration(state => state.gatewayPath)

    return useMemo<string>(() => {

        const cleanedPath = () => {
            if (graphqlServiceLocation.path.startsWith('/')) {
                return graphqlServiceLocation.path.slice(1);
            }
            return graphqlServiceLocation.path
        }

        return `${gatewayPath}:${graphqlServiceLocation.port}/${cleanedPath()}`
    }, [graphqlServiceLocation, gatewayPath])
}