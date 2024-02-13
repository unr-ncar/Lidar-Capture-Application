import LidarItem from "../../../components/lidarItem.tsx";
import useLidarMetadataSelectionList from "../../../hooks/useLidarMetadataSelectionList.tsx";
import {LidarSelection_t} from "../types.capture.tsx";

export default function CaptureStatus() {

    const {isLoading, error, selections} = useLidarMetadataSelectionList()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error Occurred...</p>

    return (
        <div className='flex flex-col gap-2'>
            {
                selections?.map((selection: LidarSelection_t) => {return <LidarItem key={selection.lidar.lidar_id} {...selection.lidar} />})
            }
        </div>
    )
}
