import axios from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {LidarMetadata_t, LidarMetadataResponse_t} from "../types.tsx";

const fetchLidarMetadata = async (gatewayIp: string, page: number): Promise<LidarMetadataResponse_t> => {
    const url: string = `${gatewayIp}/metadata?page=${page}`
    const response = await axios.get(url)
    return response.data
}
export default function useLidarMetadataList(gatewayIp: string, page: number): UseQueryResult<Promise<Array<LidarMetadata_t>>> {

    return useQuery({
        queryKey: ['lidar_metadata', page],
        queryFn: async (): Promise<LidarMetadataResponse_t> => fetchLidarMetadata(gatewayIp, page),
        select: async (data): Promise<Array<LidarMetadata_t>> => {
            return data.items
        }
    })

}