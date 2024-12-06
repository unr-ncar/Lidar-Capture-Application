import useMetadataServicePath from "./useMetadataServicePath.ts";
import useQueryStringCreator from "../../useQueryStringCreator.ts";
import {useEffect, useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import useCache from "../../cache/useCache.ts";

export interface IIntersectionCenter {
    latitude: number;
    longitude: number;
}
export interface ILidarMetadata {
    items: Array<ILidarMetadataItem>;
    page: number;
    pages: number;
    size: number;
    total: number;
}
export interface ILidarMetadataItem extends Record<string, string | number | IIntersectionCenter | undefined>, Readonly<{page?: number, size?: number}> {
    lidar_id?: string;
    site_id?: string;
    deployment_id?: string;
    state?: string;
    city?: string;
    street?: string;
    cross_street?: string;
    mqtt_topic?: string;
    data_port?: number;
    nmea_port?: number;
    interface?: string;
    front_direction?: number;
    lidar_ip?: string;
    ip?: string;
    model?: string;
    intersection_center?: IIntersectionCenter;
    page?: number;
    size?: number;
}
export type TLidarMetadataQuery = Omit<ILidarMetadataItem, "page" | "size">

export default function useLidarMetadata(requestedPage: number, requestedSize: number, queryParameters?: TLidarMetadataQuery) {
    const servicePath = useMetadataServicePath();
    const { queryString, queryHash } = useQueryStringCreator<ILidarMetadataItem>({
        page: requestedPage,
        size: requestedSize,
        ...queryParameters
    });

    const { cacheEntry, updateCacheEntry } = useCache("metadataService", queryHash, JSON.stringify);

    const requestURL = useMemo<string>(() => {
        return `${servicePath}?${queryString}`;
    }, [servicePath, queryString]);

    const getMetadata = useMemo(() => async (): Promise<ILidarMetadata> => {
        const response = await axios.get(requestURL);
        return response.data;
    }, [requestURL]);

    const query = useQuery({
        queryKey: ["lidar_metadata", queryHash],
        queryFn: getMetadata,
        placeholderData: () => {
            if (!cacheEntry) return undefined;
            return cacheEntry.data as ILidarMetadata;
        }
    });

    useEffect(() => {
        if (query.isSuccess && !query.isFetching) updateCacheEntry(query.data);
    }, [query.data, query.isFetching, query.isSuccess, updateCacheEntry, queryHash]);

    return query;
}