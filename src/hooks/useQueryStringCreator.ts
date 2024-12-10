import { useMemo } from 'react';

export default function useQueryStringCreator<T extends Object>(query: T | undefined) {

    return useMemo(() => {

        if (!query) return ""

        const entries = Object.entries(query).filter(([, value]) => value !== undefined && value !== null);

        const queryParts = entries.map(([key, value]): string => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
        });
        return queryParts.join('&');
    }, [query]);

}
