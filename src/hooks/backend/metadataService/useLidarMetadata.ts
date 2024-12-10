import useMetadataServicePath from "./useMetadataServicePath.ts";
import useQueryStringCreator from "../../useQueryStringCreator.ts";
import {useCallback, useEffect, useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import useCache from "../../useCache.ts";
import {hash} from "ohash";

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
export interface ILidarMetadataItem extends Readonly<{page?: number, size?: number}> {
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
    const queryString = useQueryStringCreator<ILidarMetadataItem>({
        page: requestedPage,
        size: requestedSize,
        ...queryParameters
    });
    const requestURL = useMemo<string>(() => {
        return `${servicePath}?${queryString}`;
    }, [servicePath, queryString]);
    const queryHash = useMemo(() => hash(requestURL), [requestURL]);

    const { queryCacheEntry, mutateCacheEntry } = useCache<ILidarMetadata>(queryHash, JSON.stringify);

    const getMetadata = useCallback(async () => {
        const response = await axios.get(requestURL);
        return response.data;
    }, [requestURL]);

    const query = useQuery({
        queryKey: ["lidar_metadata", queryString],
        queryFn: getMetadata,
        placeholderData: () => {
            const entry = queryCacheEntry()
            if (!entry) return undefined;
            return entry;
        }
    });

    useEffect(() => {
        if (query.isSuccess && !query.isFetching) mutateCacheEntry(query.data);
    }, [query.data, query.isFetching, query.isSuccess, mutateCacheEntry]);

    return query;
}
