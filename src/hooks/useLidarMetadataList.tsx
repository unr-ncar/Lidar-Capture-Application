import axios from "axios";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {LidarMetadataResponse_t} from "../types.tsx";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";

const fetchLidarMetadata = async (gatewayIp: string, page: number, size: number): Promise<LidarMetadataResponse_t> => {
    const url: string = `${gatewayIp}/metadata?page=${page}&size=${size}`;
    const response = await axios.get(url)
    return response.data
}
export default function useLidarMetadataList(page: number, size: number = 10): UseQueryResult<LidarMetadataResponse_t> {

    const metadataServiceUrl= useGatewayConfiguration((state) => state.metadataServiceUrl)

    return useQuery({
        queryKey: ['lidar_metadata_list', page, size],
        queryFn: async (): Promise<LidarMetadataResponse_t> => fetchLidarMetadata(metadataServiceUrl, page, size),
        placeholderData: () => {return {
            items: [],
            total: 0,
            page: 0,
            size: 0,
            pages: 0,
        }}
    })

}