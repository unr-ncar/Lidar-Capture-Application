import {LidarSelection_t} from "../routes/capture/types.capture.tsx";
import useStatus from "../hooks/useStatus.tsx";

export default function LidarStartSelection({currentFormatSelection, onChangeHandler, lidar, ros_selected, pcap_selected}: LidarSelection_t & {
    currentFormatSelection: string,
    onChangeHandler: () => void;
}) {

    const {lidar_id} = lidar;

    const {isLoading, error, services } = useStatus(lidar.site_id)
    const { pcapRecordingServiceActive, rosRecordingServiceActive } = services;
    if (isLoading) return <p>Loading...lidar_id: {lidar.lidar_id}</p>
    if (error) return <p>Error Occurred...lidar_id: {lidar.lidar_id}</p>

    return (
        <label className='bg-neutral-200 my-2 p-2 rounded'>
            <p>lidar_id: {lidar_id}</p>
            <input type='checkbox' checked={(currentFormatSelection === 'pcap' && pcap_selected) || (currentFormatSelection === 'ros' && ros_selected)} onChange={onChangeHandler}
                   disabled={((currentFormatSelection === 'pcap') && pcapRecordingServiceActive(lidar_id)) || ((currentFormatSelection === 'ros' && rosRecordingServiceActive(lidar_id)))}/>
            <p>
                Recording (PCAP): {pcapRecordingServiceActive(lidar_id) ? "True" : "False"}
            </p>
            <p>
                Recording (ROS): {rosRecordingServiceActive(lidar_id) ? "True" : "False"}
            </p>
        </label>
    )
}