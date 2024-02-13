import {DataFormat_t, LidarSelection_t} from "../routes/capture/types.capture.tsx";
import {LidarMetadata_t} from "../api/rest.tsx";
import requestLidarMetadataList from "../api/rest.lidarMetadataList.tsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";

export interface useLidarMetadataSelectionList_t {
    isLoading: boolean;
    error: Error | null;
    selections: Array<LidarSelection_t> | undefined
    toggleLidarSelection: (lidar_id: number, target_data_format: DataFormat_t) => void
    resetLidarSelections: () => void
}

export default function useLidarMetadataSelectionList(): useLidarMetadataSelectionList_t {

    const queryClient = useQueryClient();

    const createLidarSelections = async (): Promise<Array<LidarSelection_t>> => {
        const lidar_metadata_list: Array<LidarMetadata_t> = await requestLidarMetadataList('http://134.197.75.31:31538');
        return lidar_metadata_list?.map((lidar: LidarMetadata_t) => {
            const lidar_selection: LidarSelection_t = {
                lidar: lidar,
                pcap_selected: false,
                ros_selected: false
            }
            return lidar_selection
        })
    }

    const {data, isPending, error} = useQuery({
        queryKey: ['lidar_metadata_list'],
        queryFn: async (): Promise<Array<LidarSelection_t>> => createLidarSelections(),
        refetchInterval: false,
        refetchOnWindowFocus: false
    })

    const toggle = (lidar_id: number, target_data_format: DataFormat_t) => {
        queryClient.setQueryData(['lidar_metadata_list'], (previousState: Array<LidarSelection_t>) => {
            return previousState.map((lidar_selection: LidarSelection_t) => {
                if (lidar_selection.lidar.lidar_id === lidar_id) {
                    return {
                        ...lidar_selection,
                        ros_selected: target_data_format === 'ros' && !lidar_selection.ros_selected,
                        pcap_selected: target_data_format === 'pcap' && !lidar_selection.pcap_selected
                    }
                }

                return lidar_selection
            })

        })

    }

    const reset = () => {
        queryClient.setQueryData(['lidar_metadata_list'], (previousState: Array<LidarSelection_t>) => {
            return previousState.map((lidar_selection: LidarSelection_t) => {
                return {
                    ...lidar_selection,
                    pcap_selected: false,
                    ros_selected: false
                }
            })
        })
    }

    return {
        isLoading: isPending,
        error: error,
        selections: data,
        toggleLidarSelection: toggle,
        resetLidarSelections: reset
    }

}