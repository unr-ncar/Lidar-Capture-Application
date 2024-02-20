import {LidarMetadata_response_t, LidarMetadata_t} from "../api/rest.tsx";
import requestLidarMetadataList from "../api/rest.lidarMetadataList.tsx";
import {QueryStatus, useQuery} from "@tanstack/react-query";
import {Dispatch, SetStateAction, useState} from "react";

export interface useLidarMetadataSelectionList_t {
    isPending: boolean;
    status: QueryStatus;
    error: Error | null;
    state: LidarMetadataList_t | undefined;
    setPage: Dispatch<SetStateAction<number>>
}

export interface LidarMetadataList_t {
    items: Array<LidarMetadata_t>;
    total: number;
    page: number;
    size: number;
    pages: number;
}

export default function useLidarMetadataList(): useLidarMetadataSelectionList_t {

    const [page, set_page] = useState<number>(1)

    const {isPending, data, error, status} = useQuery({
        queryKey: ['lidar_metadata_list', page],
        queryFn: async (): Promise<LidarMetadata_response_t> => requestLidarMetadataList('http://134.197.75.31:31538', page),
        refetchInterval: false,
        refetchOnWindowFocus: false
    })

    return {
        isPending: isPending,
        status: status,
        error: error,
        state: data,
        setPage: set_page
    }

}