import { create } from "zustand";
import useLocalStorage from "./useLocalStorage.ts";

export interface ICacheConfiguration {
    pageSize: number;
    expirationTimeDays: number;
}

export interface ICacheConfigurationState {
    graphqlService: ICacheConfiguration;
    metadataService: ICacheConfiguration;
    fileService: ICacheConfiguration;
}

export interface ICacheConfigurationAction {
    setCacheConfiguration: (target: keyof ICacheConfigurationState, config: ICacheConfiguration) => void;
}

const useCacheConfiguration = create<ICacheConfigurationState & ICacheConfigurationAction>((set) => ({
    graphqlService: {
        pageSize: Number(useLocalStorage("graphqlServicePageSize").readEntry()) || 10,
        expirationTimeDays: Number(useLocalStorage("graphqlServiceExpirationTimeDays").readEntry()) || 14
    },
    metadataService: {
        pageSize: Number(useLocalStorage("metadataServicePageSize").readEntry()) || 10,
        expirationTimeDays: Number(useLocalStorage("metadataServiceExpirationTimeDays").readEntry()) || 14,
    },
    fileService: {
        pageSize: Number(useLocalStorage("fileServicePageSize").readEntry()) || 10,
        expirationTimeDays: Number(useLocalStorage("fileServiceExpirationTimeDays").readEntry()) || 14,
    },
    setCacheConfiguration: (target: keyof ICacheConfigurationState, config: ICacheConfiguration) =>
        set(state => ({
            ...state,
            [target]: config
        }))
}));

export default useCacheConfiguration;
