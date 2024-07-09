import {useQuery} from "@tanstack/react-query";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";
import axios from "axios";
import {DatabaseMetadataResponse_t} from "../types.tsx";

export function useFileMetadata(fileName: string) {

    const fileServiceUrl= useGatewayConfiguration((state) => state.fileServiceUrl)

    return useQuery({
        queryKey: ['file_metadata', fileName],
        queryFn: async (): Promise<DatabaseMetadataResponse_t> => {
            const url = `${fileServiceUrl}/files?filename=${fileName}`;
            const response = await axios.get(url)
            return response.data
        },
        select: (previousData) => {
            return previousData.items[0]
        }
    })
}