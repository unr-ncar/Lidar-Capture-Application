import useGatewayConfiguration from "./useGatewayConfiguration.tsx";
import {useQuery} from "@tanstack/react-query";
import {LidarMetadataResponse_t} from "../types.tsx";
import axios from "axios";

export default function useLidarMetadata(lidarId: number) {

    const metadataServiceUrl= useGatewayConfiguration((state) => state.metadataServiceUrl)

    return useQuery({
        queryKey: ['lidar_metadata', lidarId],
        queryFn: async (): Promise<LidarMetadataResponse_t> => {
            const url: string = `${metadataServiceUrl}/metadata?lidar_id=${lidarId}`;
            const response = await axios.get(url)
            return response.data
        },
        select: (previousData) => {
            return previousData.items[0]
        }
    })

}