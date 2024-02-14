import {LidarSelection_t} from "../routes/capture/types.capture.tsx";
import useStatus from "../hooks/useStatus.tsx";

export default function LidarStopSelection({lidar, currentFormatSelection, ros_selected, pcap_selected, onChangeHandler}: LidarSelection_t & {
    currentFormatSelection: string,
    onChangeHandler: () => void
}) {
    const {lidar_id, site_id} = lidar;

    const { isLoading, error, services } = useStatus(site_id)
    const { pcapRecordingServiceActive, rosRecordingServiceActive } = services;
    if (isLoading) return <p>Loading...lidar_id: {lidar_id}</p>
    if (error) return <p>Error Occurred...lidar_id: {lidar_id}</p>

    return (
        <label className='bg-neutral-200 my-2 p-2 rounded'>
            <p>lidar_id: {lidar_id} - site_id: {site_id}</p>
            <input type='checkbox'
                   checked={(currentFormatSelection === 'pcap' && pcap_selected) || (currentFormatSelection === 'ros' && ros_selected)}
                   onChange={onChangeHandler}
                   disabled={(!rosRecordingServiceActive(lidar_id) && currentFormatSelection === 'ros') || (!pcapRecordingServiceActive(lidar_id) && currentFormatSelection === 'pcap')}/>
            <p>
                Recording (PCAP): {pcapRecordingServiceActive(lidar_id) ? "True" : "False"}
            </p>
            <p>
                Recording (ROS): {rosRecordingServiceActive(lidar_id) ? "True" : "False"}
            </p>
        </label>
    )

}