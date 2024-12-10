interface ILocalStorage {
    fileServicePageSize: number;
    fileServiceExpirationTimeDays: number;
    graphqlServicePageSize: number;
    graphqlServiceExpirationTimeDays: number;
    metadataServicePageSize: number;
    metadataServiceExpirationTimeDays: number;
}

export default function useLocalStorage(key?: keyof ILocalStorage) {

    const writeEntry = (value: string) => {
        if (!key) throw new Error("useLocalStorage key is required");
        localStorage.setItem(key, value);
    }

    const readEntry = (): string | null => {
        if (!key) throw new Error("useLocalStorage key is required");
        return localStorage.getItem(key);
    }

    const clearEntries = () => {
        localStorage.clear()
    }

    return {writeEntry, readEntry, clearEntries}

}