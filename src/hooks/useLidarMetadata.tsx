import {QueryStatus, useQuery} from "@tanstack/react-query";
import axios from "axios";

export interface LidarMetadataItem_t {
    lidar_id: number;
    site_id: number;
    deployment_id: number;
    state: string;
    city: string;
    street: string;
    cross_street: string;
    mqtt_topic: string;
    data_port: number;
    nmea_port: number;
    interface: string;
    front_direction: number;
    lidar_ip: string;
    ip: string;
    model: string;
    corner: string;
    longitude: number;
    latitude: number;
}
export interface LidarMetadata_t {
    items: Array<LidarMetadataItem_t>;
    total: number;
    page: number;
    size: number;
    pages: number;
}
const fetchLidarMetadata = async (gatewayIp: string, page: number): Promise<LidarMetadata_t> => {
    const url: string = `${gatewayIp}/metadata?page=${page}`
    const response = await axios.get(url)
    return response.data
}
export interface useLidarMetadata_t {
    isPending: boolean;
    error: Error | null;
    data: LidarMetadata_t | undefined;
    status: QueryStatus;
}
const useLidarMetadata = (currentPage: number = 1): useLidarMetadata_t => {

    const {isPending, error, data, status} = useQuery({
        queryKey: ['lidar_metadata', currentPage],
        queryFn: async () => fetchLidarMetadata('http://134.197.75.31:31538', currentPage)
    })

    return {
        isPending,
        error,
        data,
        status
    }
}
export default useLidarMetadata;