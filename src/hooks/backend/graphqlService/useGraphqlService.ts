import useGraphqlServicePath from "./useGraphqlServicePath.ts";
import {useCallback, useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import {hash} from "ohash";
import useCache from "../../cache/useCache.ts";
import {request} from "graphql-request";

export default function useGraphqlService(queryName: string, query: string) {
    const servicePath = useGraphqlServicePath();
    const queryHash = useMemo<string>(() => {
        return hash(query)
    }, [query])

    const { cacheEntry, updateCacheEntry } = useCache("graphqlService", queryHash, JSON.stringify);

    const getQuery = useCallback(() => async () => {
        return request(servicePath, query)
    }, [query, servicePath]);

    return useQuery({
        queryKey: [queryName, queryHash],
        queryFn: getQuery,
        placeholderData: () => {
            if (!cacheEntry) return undefined;
            return cacheEntry.data
        }
    })

    console.log(servicePath)
    return
}
