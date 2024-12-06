import { useMemo } from 'react';
import {hash} from "ohash";

export default function useQueryStringCreator<T extends Record<string, unknown>>(query: T | undefined) {

    const queryString = useMemo(() => {

        if (!query) return ""

        const entries = Object.entries(query).filter(([, value]) => value !== undefined && value !== null);

        const queryParts = entries.map(([key, value]): string => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
        });
        return queryParts.join('&');
    }, [query]);

    const queryHash = useMemo<string>(() => {
        return hash(query)
    }, [query])

    return {queryString, queryHash}

}
