import { FileMetadataResponse_t} from "../types.tsx";
import {useQuery} from "@tanstack/react-query";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";
import axios from "axios";

/* Incomplete (06/21/2024 at 7:48 p.m.) */

const fetchFileMetadata = async (gatewayIp: string, page: number): Promise<FileMetadataResponse_t> => {
    const url: string = `${gatewayIp}/files?page=${page}`
    const response = await axios.get(url)
    return response.data
}

export default function useFileMetadataList(page: number) {

    const fileServiceUrl = useGatewayConfiguration((state) => state.fileServiceUrl)

    return useQuery({
        queryKey: ['file_metadata', page],
        queryFn: async (): Promise<FileMetadataResponse_t> => fetchFileMetadata(fileServiceUrl, page),
        placeholderData: (previousData) => {
            return previousData
        }
    })


}