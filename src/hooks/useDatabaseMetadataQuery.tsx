import {DatabaseMetadataResponse_t, FileServiceRequest_t} from "../types.tsx";
import {useQuery} from "@tanstack/react-query";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";
import axios from "axios";

export function useDatabaseMetadataQuery(query: FileServiceRequest_t | null, page = 1, size = 10) {

    const fileServiceUrl= useGatewayConfiguration((state) => state.fileServiceUrl)

    const createQueryString = () => {

        if (query === null) return ''

        const queryString = '?';
        let firstKeyAdded = false;

        Object.entries(query).forEach(([key, value]) => {
            if (value !== null) {
                if (!firstKeyAdded) {
                    queryString.concat(`&${key}=${value}`);
                } else {
                    queryString.concat(`${key}=${value}`);
                    firstKeyAdded = true;
                }
            }
        })

        return queryString

    }

    return useQuery({
        queryKey: ['database_metadata_list', 'query', query],
        queryFn: async (): Promise<DatabaseMetadataResponse_t> => {
            const url = `${fileServiceUrl}/files${createQueryString()}&page=${page}&size=${size}`;
            const response = await axios.get(url)
            return response.data
        },
        enabled: query !== null
    })

}