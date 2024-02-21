import { LidarMetadataItem_t} from "../hooks/useLidarMetadata.tsx";
import {useMutation} from "@tanstack/react-query";
import {PcapService_response_t, RosService_response_t} from "../api/rest.tsx";
import axios from "axios";
import {Dispatch, SetStateAction, useEffect} from "react";
import {CaptureFormat_t, LidarSelectionItem_t, Operation_t} from "../routes/capture/start/CaptureStart.tsx";


const requestStartPcapService = async (site_ip: string, lidar_id: number): Promise<PcapService_response_t> => {

    const url: string = `https://${site_ip}:40001/start/${lidar_id}`
    console.log(url)
    return await axios.get(url)

}

const requestStopPcapService = async (site_ip: string, lidar_id: number): Promise<PcapService_response_t> => {

    const url: string = `https://${site_ip}:40001/stop/${lidar_id}`
    return await axios.get(url)

}
const requestStartRosService = async (site_ip: string, lidar_id: number): Promise<RosService_response_t> => {

    const url: string = `https://${site_ip}:40000/start/${lidar_id}`
    console.log(url)
    return await axios.get(url)

}
const requestStopRosService = async (site_ip: string, lidar_id: number): Promise<RosService_response_t> => {

    const url: string = `https://${site_ip}:40000/stop/${lidar_id}`
    console.log(url)
    return await axios.get(url)

}
const LidarSelectionItem = ({operation, format, lidarSelectionItemsState, selectionItem}: {lidarSelectionItemsState: {state: Array<LidarSelectionItem_t>, setter: Dispatch<SetStateAction<Array<LidarSelectionItem_t>>>}, selectionItem: LidarSelectionItem_t, operation: Operation_t, format: CaptureFormat_t}) => {

    const requestRecordingServices = async (): Promise<{ message: string, success: boolean }> => {
        console.log('HITTING ENDPOINT')
        let result;

        if (format === 'pcap' && operation === 'start') {
            result = await requestStartPcapService(selectionItem.lidar.ip, selectionItem.lidar.lidar_id);
        } else if (format === 'pcap' && operation === 'stop') {
            result = await requestStopPcapService(selectionItem.lidar.ip, selectionItem.lidar.lidar_id);
        } else if (format === 'ros' && operation === 'start') {
            result = await requestStartRosService(selectionItem.lidar.ip, selectionItem.lidar.lidar_id);
        } else {
            result = await requestStopRosService(selectionItem.lidar.ip, selectionItem.lidar.lidar_id);
        }

        if (!result.success) throw new Error(result.message)

        return result;

    }

    const { isPending, error, mutate} = useMutation({
        mutationKey: ['job', format, operation, selectionItem.lidar.lidar_id],
        mutationFn: async () => requestRecordingServices()
    })

    const { setter} = lidarSelectionItemsState;

    useEffect(() => {
        setter((prevState: Array<LidarSelectionItem_t>) => {
            return prevState.map((lidarSelectionItem: LidarSelectionItem_t) => {
                if (lidarSelectionItem.lidar.lidar_id === selectionItem.lidar.lidar_id) {

                    return {
                        ...lidarSelectionItem,
                        mutateFunction: mutate
                    }
                }
                return lidarSelectionItem
            })
        })
    }, [selectionItem.lidar.lidar_id, mutate, setter]);

    const handleToggle = (selectedItem: LidarMetadataItem_t) => {
        setter((prevState: Array<LidarSelectionItem_t>) => {
            return prevState.map((lidarSelectionItem: LidarSelectionItem_t) => {
                if (lidarSelectionItem.lidar.lidar_id === selectedItem.lidar_id) {
                    return {
                        ...lidarSelectionItem,
                        selected: !lidarSelectionItem.selected
                    }
                }
                return lidarSelectionItem
            })
        })
    }

    return (
        <label className='border-b-2 border-neutral-200'>
            <input type="checkbox" disabled={isPending} checked={selectionItem.selected} onChange={() => handleToggle(selectionItem.lidar)} />
            <p>
                lidar_id: {selectionItem.lidar.lidar_id}
            </p>
            {error && <p>Error Occurred: {error.message} </p>}
        </label>
    )
}
export default LidarSelectionItem;