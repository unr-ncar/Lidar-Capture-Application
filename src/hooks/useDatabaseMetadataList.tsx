import {DatabaseMetadata_t, DatabaseMetadataResponse_t, FileServiceRequest_t} from "../types.tsx";
import {useQuery} from "@tanstack/react-query";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";
import axios from "axios";

/* Incomplete (06/21/2024 at 7:48 p.m.) */

const fetchDatabaseMetadata = async (gatewayIp: string, page: number, size: number): Promise<DatabaseMetadataResponse_t> => {
    const url: string = `${gatewayIp}/files?page=${page}&size=${size}`
    const response = await axios.get(url).then((response) => response.data).then((data: DatabaseMetadataResponse_t) => {
        return {
            ...data,
            items: [...data.items.filter((databaseMetadataItem: DatabaseMetadata_t) => !databaseMetadataItem.filename.includes("test"))]
        }
    })
    return response
}

export default function useDatabaseMetadataList(query: FileServiceRequest_t | null, page: number, size: number = 10) {

    const fileServiceUrl = useGatewayConfiguration((state) => state.fileServiceUrl)

    return useQuery({
        queryKey: ['database_metadata_list', page],
        queryFn: async (): Promise<DatabaseMetadataResponse_t> => fetchDatabaseMetadata(fileServiceUrl, page, size),
        placeholderData: (previousData) => {
            return previousData
        },
        select: (previousData) => {
            return {
                ...previousData,
                items: previousData.items.filter((item: DatabaseMetadata_t) => item.lidar_id !== 'testor')
            }
        }
    })


}