import useGraphqlServicePath from "./useGraphqlServicePath.ts";
import {useCallback, useEffect, useMemo} from "react";
import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {hash} from "ohash";
import useCache from "../../useCache.ts";
import {request} from "graphql-request";

export default function useGraphqlService<DataType>(queryName: string, queryBody: string, experiation_time_days: number = 1, queryOptions?: Omit<UseQueryOptions, "queryKey" | "queryFn" | "placeholderData">) {
    const servicePath = useGraphqlServicePath();
    const queryHash = useMemo<string>(() => hash([servicePath, queryBody].join(":")), [queryBody]);

    const { queryCacheEntry, mutateCacheEntry } = useCache<DataType>(queryHash, JSON.stringify, experiation_time_days);

    const getQuery = useCallback(async () => {
        return request(servicePath, queryBody);
    }, [queryBody, servicePath]);

    const query = useQuery({
        queryKey: [queryName, queryBody],
        queryFn: getQuery,
        placeholderData: () => {
            const entry = queryCacheEntry()
            if (!entry) return undefined;
            return entry;
        },
        ...queryOptions
    })

    useEffect(() => {
        if (query.isSuccess && !query.isFetching) mutateCacheEntry(query.data as DataType);
    }, [query.data, query.isFetching, query.isSuccess, mutateCacheEntry]);

    return query;
}
