import {DatabaseMetadata_t, DatabaseMetadataResponse_t} from "../types.tsx";
import {useQuery} from "@tanstack/react-query";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";
import axios from "axios";
import {DatabaseItemQuery_t} from "../views/explorer/ExplorerRoot.tsx";
import {useMemo} from "react";

/* Incomplete (06/21/2024 at 7:48 p.m.) */

export default function useDatabaseMetadataList(query: DatabaseItemQuery_t | null, page: number, size: number = 10) {

    const fileServiceUrl = useGatewayConfiguration((state) => state.fileServiceUrl)

    const searchParamsUrl = useMemo(() => {
        if (query === null) return '';

        let url = ''

        Object.entries(query).forEach(([key, value]) => {
            url += `&${key}=${value}`;
        })

        return url;
    }, [query])

    return useQuery({
        queryKey: ['database_metadata_list', page, query],
        queryFn: async (): Promise<DatabaseMetadataResponse_t> => {

            const url: string = `${fileServiceUrl}/files?page=${page}&size=${size}${searchParamsUrl}`
            console.log(url)
            return await axios.get(url).then((response) => response.data).then((data: DatabaseMetadataResponse_t) => {
                return {
                    ...data,
                    items: [...data.items.filter((databaseMetadataItem: DatabaseMetadata_t) => !databaseMetadataItem.filename.includes("test"))]
                }
            })
        },
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