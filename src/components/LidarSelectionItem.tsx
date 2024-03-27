import {LidarSelection_t, StatusMetadata_t} from "../types.tsx";
import useStatus from "../hooks/useStatus.tsx";
import {useEffect, useState} from "react";

export default function LidarSelectionItem({ lidarSelection, statusMetadata }: {lidarSelection: LidarSelection_t, statusMetadata: StatusMetadata_t}) {

    const { isPending, data, isStale } = useStatus(lidarSelection.item.lidar_id, lidarSelection.item.site_id)
    const [receivedTime, setReceivedTime] = useState<string>(new Date(Date.now()).toLocaleString('en-US'))

    useEffect(() => {
        if (isStale) {
            setReceivedTime(new Date(Date.now()).toLocaleString('en-US'))
        }
    }, [isStale]);

    return (
        <div className='bg-stone-100'>
            {isPending ? statusMetadata.pcapServiceStatus && <p>PCAP RECORDING</p> : data?.pcapServiceStatus.isRecording && <p>PCAP RECORDING</p> }
            {isPending ? statusMetadata.rosServiceStatus && <p>ROS RECORDING</p> : data?.rosServiceStatus.isRecording && <p>ROS RECORDING</p> }
            <p>
                {lidarSelection.item.lidar_id}
            </p>
            <p>
                Last Updated: {receivedTime}
            </p>
        </div>
    )
}