import {DataFormat_t, LidarSelection_t} from "../routes/capture/types.capture.tsx";
import {LidarMetadata_response_t, LidarMetadata_t} from "../api/rest.tsx";
import requestLidarMetadataList from "../api/rest.lidarMetadataList.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

export interface useLidarMetadataSelectionList_t {
    isLoading: boolean;
    error: Error | null;
    state: LidarSelectionsState_t | undefined;
    toggleLidarSelection: (lidar_id: number, target_data_format: DataFormat_t) => void
    resetLidarSelections: () => void,
    setPage: Dispatch<SetStateAction<number>>
}

export interface LidarSelectionsState_t {
    items: Array<LidarSelection_t>;
    total: number;
    page: number;
    size: number;
    pages: number;
}

export default function useLidarMetadataSelectionList(): useLidarMetadataSelectionList_t {

    const queryClient = useQueryClient();

    const [page, set_page] = useState<number>(1)

    useEffect(() => {
        console.log("Updated to page: " + page)
    }, [page])

    const createLidarSelections = async (): Promise<LidarSelectionsState_t> => {
        const lidar_metadata_list: LidarMetadata_response_t = await requestLidarMetadataList('http://134.197.75.31:31538', page);
        return {
            ...lidar_metadata_list,
            items: lidar_metadata_list.items.map((selection: LidarMetadata_t) => {
                const lidar_selection: LidarSelection_t = {
                    lidar: selection,
                    pcap_selected: false,
                    ros_selected: false
                }
                return lidar_selection
            })
        }
    }

    const {data, isPending, error} = useQuery({
        queryKey: ['lidar_metadata_list', page],
        queryFn: async (): Promise<LidarSelectionsState_t> => createLidarSelections(),
        refetchInterval: false,
        refetchOnWindowFocus: false
    })

    const toggle = (lidar_id: number, target_data_format: DataFormat_t) => {
        queryClient.setQueryData(['lidar_metadata_list', page], (previousState: LidarSelectionsState_t) => {
            return {
                ...previousState,
                items: previousState.items.map((lidar_selection: LidarSelection_t) => {
                    if (lidar_selection.lidar.lidar_id === lidar_id) {
                        return {
                            ...lidar_selection,
                            ros_selected: target_data_format === 'ros' && !lidar_selection.ros_selected,
                            pcap_selected: target_data_format === 'pcap' && !lidar_selection.pcap_selected
                        }
                    }

                    return lidar_selection
                })
            }

        })

    }

    const reset = () => {
        queryClient.setQueryData(['lidar_metadata_list', page], (previousState: LidarSelectionsState_t) => {
            return {
                ...previousState,
                items: previousState.items.map((lidar_selection: LidarSelection_t) => {
                    return {
                        ...lidar_selection,
                        pcap_selected: false,
                        ros_selected: false
                    }
                })
            }

        })
    }

    return {
        isLoading: isPending,
        error: error,
        state: data,
        toggleLidarSelection: toggle,
        resetLidarSelections: reset,
        setPage: set_page
    }

}