import { useLiveQuery } from "dexie-react-hooks";
import {hash} from "ohash"
import db from "./db";

export default function useCache<DataType>(queryHash: string, dataSerializer: (params: any) => string, experiation_time_days: number = 14) {

    const EXPERIATION_TIME = 1000 * 60 * 60 * 24 * experiation_time_days; // 14 days

    const cacheEntry = useLiveQuery(() => db.backendCache.get(queryHash), [queryHash]);

    const computeDataHash = (data: DataType) => {
        return hash(dataSerializer(data));
    }

    const queryCacheEntry = () => {
        if (!cacheEntry) return undefined;
        if (Date.now() - new Date(cacheEntry.lastUpdated).getTime() > EXPERIATION_TIME) {
            db.backendCache.delete(queryHash);
            return undefined;
        }
        return cacheEntry.data as DataType;
    }

    const mutateCacheEntry = (newData: DataType) => {

        const newDataHash = computeDataHash(newData);

        if (cacheEntry === undefined) {
            console.log("Data is not present, adding to cache");
            db.backendCache.add({
                queryHash,
                dataHash: newDataHash,
                lastUpdated: new Date().toISOString(),
                data: newData
            });
            return;
        } else if (cacheEntry.dataHash !== newDataHash) {
            console.log("Data is changed, updating cache");
            db.backendCache.update(queryHash, {
                dataHash: newDataHash,
                lastUpdated: new Date().toISOString(),
                data: newData
            });
        } else {
            console.log("Data has not changed, not updating cache");
        }
    }

    return {
        queryCacheEntry,
        mutateCacheEntry
    }


}