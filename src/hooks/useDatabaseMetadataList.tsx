import {DatabaseMetadata_t, DatabaseMetadataResponse_t} from "../types.tsx";
import {useQuery} from "@tanstack/react-query";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";
import axios from "axios";
import {DatabaseItemQuery_t} from "../views/explorer/ExplorerRoot.tsx";
import {useEffect} from "react";

/* Incomplete (06/21/2024 at 7:48 p.m.) */

const fetchDatabaseMetadata = async (gatewayIp: string, page: number, size: number): Promise<DatabaseMetadataResponse_t> => {
    const url: string = `${gatewayIp}/files?page=${page}&size=${size}`
    return await axios.get(url).then((response) => response.data).then((data: DatabaseMetadataResponse_t) => {
        return {
            ...data,
            items: [...data.items.filter((databaseMetadataItem: DatabaseMetadata_t) => !databaseMetadataItem.filename.includes("test"))]
        }
    })
}

export default function useDatabaseMetadataList(query: DatabaseItemQuery_t | null, page: number, size: number = 10) {

    const fileServiceUrl = useGatewayConfiguration((state) => state.fileServiceUrl)

    useEffect(() => {
        console.log('useDatabaseMetadataList', query)
    }, [query]);

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