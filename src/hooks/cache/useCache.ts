import cacheDatabase, { ICacheDatabase, ICacheEntry } from "./cacheDatabase.ts";
import useCacheConfiguration from "../configuration/useCacheConfiguration.ts";
import { useCallback } from "react";
import { hash } from "ohash";
import { useLiveQuery } from "dexie-react-hooks";

export default function useCache(
    cache: keyof ICacheDatabase,
    queryId: string,
    dataSerializationFunction: (params: unknown) => string
) {
    const expirationTimeDays = useCacheConfiguration((state) => state[cache].expirationTimeDays);

    const isEntryFresh = useCallback(
        (entry: ICacheEntry) => {
            const elapsedTime = Date.now() - new Date(entry.lastUpdated).getTime();
            return elapsedTime < expirationTimeDays * 24 * 60 * 60 * 1000;
        },
        [expirationTimeDays]
    );

    const cacheEntry = useLiveQuery(async () => {
        const entry = await cacheDatabase[cache].get(queryId);

        if (entry && isEntryFresh(entry)) {
            return entry;
        }

        if (entry) {
            console.log(`Deleting expired cache entry for queryId: ${queryId}`);
            await cacheDatabase[cache].delete(queryId);
        }
        return undefined;
    }, [cache, queryId, isEntryFresh]);

    const computeDataHash = useCallback(
        (data: unknown) => hash(dataSerializationFunction(data)),
        [dataSerializationFunction]
    );

    const updateCacheEntry = useCallback(
        async (updatedData: unknown) => {
            const computedDataHash = computeDataHash(updatedData);
            const updatedEntry: ICacheEntry = {
                queryId,
                dataHash: computedDataHash,
                lastUpdated: new Date().toUTCString(),
                data: updatedData,
            };

            if (!cacheEntry) {
                console.log(`Adding new cache entry for queryId: ${queryId}`);
                await cacheDatabase[cache].add(updatedEntry);
            } else if (cacheEntry.dataHash !== computedDataHash) {
                console.log(`Updating cache entry for queryId: ${queryId}`);
                await cacheDatabase[cache].put(updatedEntry);
            } else {
                console.log(`Cache entry for queryId: ${queryId} is up-to-date. No changes made.`);
            }
        },
        [cache, queryId, cacheEntry, computeDataHash]
    );

    return {
        cacheEntry,
        updateCacheEntry,
    };
}