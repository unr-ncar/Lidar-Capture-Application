import axios from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import { LidarMetadataResponse_t} from "../types.tsx";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";

const fetchLidarMetadata = async (gatewayIp: string, page: number): Promise<LidarMetadataResponse_t> => {
    const url: string = `${gatewayIp}/metadata?page=${page}`
    const response = await axios.get(url)
    return response.data
}
export default function useLidarMetadataList(page: number): UseQueryResult<LidarMetadataResponse_t> {

    const metadataServiceUrl= useGatewayConfiguration((state) => state.metadataServiceUrl)

    return useQuery({
        queryKey: ['lidar_metadata', page],
        queryFn: async (): Promise<LidarMetadataResponse_t> => fetchLidarMetadata(metadataServiceUrl, page)
    })

}