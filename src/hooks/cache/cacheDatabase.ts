import Dexie, { type EntityTable } from 'dexie';

export interface ICacheEntry {
    queryId: string;
    dataHash: string;
    lastUpdated: string;
    data: unknown;
}

export interface ICacheDatabase {
    metadataService: EntityTable<ICacheEntry, "queryId">;
    //fileService: EntityTable<ICacheEntry<ILidarMetadata>, "pageId">;
    graphqlService: EntityTable<ICacheEntry, "queryId">;
}

const cacheDatabase = new Dexie('CacheDatabase') as Dexie & ICacheDatabase;

cacheDatabase.version(1).stores({
    metadataService: "queryId, metadata, lastUpdated, data",
    //fileService: "pageId, metadata, lastUpdated, data",
    graphqlService: "queryId, metadata, lastUpdated, data"
})

export default cacheDatabase;

