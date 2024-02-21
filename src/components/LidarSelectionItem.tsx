import { LidarMetadataItem_t} from "../hooks/useLidarMetadata.tsx";
import {UseMutateFunction, useMutation} from "@tanstack/react-query";
import {PcapService_response_t} from "../api/rest.tsx";
import axios from "axios";
import {Dispatch, SetStateAction, useEffect} from "react";
import {LidarSelectionItem_t} from "../routes/capture/start/CaptureStart.tsx";


const requestStartPcapService = async (site_ip: string, lidar_id: number): Promise<PcapService_response_t> => {

    const url: string = `http://${site_ip}:40001/start/${lidar_id}`
    console.log(url)
    return await axios.get(url)

}
const LidarSelectionItem = ({stateSetter, onChangeHandler, selected, lidar}: {stateSetter: Dispatch<SetStateAction<Array<LidarSelectionItem_t>>> , onChangeHandler: () => void, selected: boolean, lidar: LidarMetadataItem_t}) => {

    const {data, isPending, error, mutate} = useMutation({
        mutationKey: ['job', lidar.lidar_id],
        mutationFn: async () => requestStartPcapService(lidar.ip, lidar.lidar_id)
    })

    useEffect(() => {
        stateSetter((prevState: Array<LidarSelectionItem_t>) => {
            return prevState.map((lidarSelectionItem: LidarSelectionItem_t) => {
                if (lidarSelectionItem.lidar.lidar_id === lidar.lidar_id) {

                    return {
                        ...lidarSelectionItem,
                        mutateFunction: mutate
                    }
                }
                return lidarSelectionItem
            })
        })
    }, [lidar.lidar_id, mutate, stateSetter]);

    if (isPending) return <p>Loading</p>
    if (error) return <p>Error</p>
    console.log(data && data)

    return (
        <label className='border-b-2 border-neutral-200'>
            <input type="checkbox" checked={selected} onChange={onChangeHandler} />
            <p>
                lidar_id: {lidar.lidar_id}
            </p>
        </label>
    )
}
export default LidarSelectionItem;