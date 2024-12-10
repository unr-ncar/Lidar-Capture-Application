import Dexie, { type EntityTable } from 'dexie';

export interface ICacheEntry<T> {
    queryHash: string;
    dataHash: string;
    lastUpdated: string;
    data: T;
}

export interface ApplicationDatabase {
    backendCache: EntityTable<ICacheEntry<any>, "queryHash">;
}

const db = new Dexie('ApplicationDatabase') as Dexie & ApplicationDatabase;

db.version(1).stores({
    backendCache: "queryHash, dataHash, lastUpdated, data",
})

export default db;

