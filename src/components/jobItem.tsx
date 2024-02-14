import useCaptureJob from "../hooks/useCaptureJob.tsx";
import {DataFormat_t} from "../routes/capture/types.capture.tsx";
import {LidarMetadata_t} from "../api/rest.tsx";

interface JobItem_t {
    lidar: LidarMetadata_t,
    format: DataFormat_t,
    operation: 'start' | 'stop'
}
const JobItem = ({lidar, format, operation}: JobItem_t ) => {

    const { lidar_id } = lidar;
    const { isPending, error, execute, successful } = useCaptureJob(lidar_id, format, operation)

    return (
        <div className='flex gap-1 bg-neutral-200 m-2'>
            {!successful && !isPending && <p>lidar_id: {lidar_id} --- Standby</p>}
            {!successful && isPending && <p>lidar_id: {lidar_id} --- Sending</p>}
            {successful && !isPending && <p>lidar_id: {lidar_id} --- Started</p>}
            {error && !isPending && <p>lidar_id: {lidar_id} --- ERROR: {error.message}</p>}
            <button onClick={() => execute()}>
                Start
            </button>
        </div>
    )
}

export default JobItem;