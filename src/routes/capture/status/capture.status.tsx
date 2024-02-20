import useLidarMetadataList from "../../../hooks/useLidarMetadataList.tsx";
import {LidarMetadata_t} from "../../../api/rest.tsx";

export default function CaptureStatus() {

    const {isPending, error, state} = useLidarMetadataList()

    if (isPending) return <p>Loading...</p>
    if (error) return <p>Error Occurred...</p>

    return (
        <div className='flex flex-col gap-2'>
            {
                state?.items.map((selection: LidarMetadata_t) => {return <p>{selection.lidar_id}</p>})
            }
        </div>
    )
}
