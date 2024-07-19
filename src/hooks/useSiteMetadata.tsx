import {useQuery} from "@tanstack/react-query";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";
import axios from "axios";
import {LidarMetadata_t, LidarMetadataResponse_t} from "../types.tsx";

export interface useSiteMetadata_t {
    siteMetadata: {
        site_id: number;
        state: string;
        city: string;
        street: string;
        cross_street: string;
        ip: string;
        latitude: number;
        longitude: number;
    };
    sensors: Array<LidarMetadata_t>
}

export default function useSiteMetadata(site_id: number) {

    const metadataServiceUrl = useGatewayConfiguration((state) => state.metadataServiceUrl)

    return useQuery({
        queryKey: ['site_metadata', site_id],
        queryFn: async (): Promise<LidarMetadataResponse_t> => {
            const url: string = `${metadataServiceUrl}/metadata?site_id=${site_id}`;
            const response = await axios.get(url)
            return response.data
        },
        select: (previousData): useSiteMetadata_t => {

            const metadata = {
                site_id: previousData.items[0].site_id,
                state: previousData.items[0].state,
                city: previousData.items[0].city,
                street: previousData.items[0].street,
                cross_street: previousData.items[0].cross_street,
                ip: previousData.items[0].ip,
                latitude: previousData.items[0].intersection_center.latitude,
                longitude: previousData.items[0].intersection_center.longitude
            }

            return {
                siteMetadata: metadata,
                sensors: previousData.items
            }
        }
    })
}