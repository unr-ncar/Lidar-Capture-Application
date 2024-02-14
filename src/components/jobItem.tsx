import useCaptureJob from "../hooks/useCaptureJob.tsx";
import {DataFormat_t} from "../routes/capture/types.capture.tsx";
import {LidarMetadata_t} from "../api/rest.tsx";

interface JobItem_t {
    lidar: LidarMetadata_t;
    format: DataFormat_t;
    operation: 'start' | 'stop';
}
const JobItem = ({lidar, format, operation}: JobItem_t ) => {

    const { lidar_id, ip, site_id, deployment_id } = lidar;
    const { isPending, error, data, execute } = useCaptureJob(lidar_id, ip, deployment_id,  format, operation)


    return (
        <div className='flex gap-1 bg-neutral-200 m-2'>
            {!data && !isPending && <p>lidar_id: {lidar_id} // site_id: {site_id} --- Standby</p>}
            {!data && isPending && <p>lidar_id: {lidar_id} --- Sending</p>}
            {data && !isPending && <p>lidar_id: {lidar_id} --- Completed</p>}
            {error === null && !isPending && <p>lidar_id: {lidar_id} --- ERROR: {error}</p>}
            <button onClick={execute}>
                Start
            </button>
        </div>
    )
}

export default JobItem;