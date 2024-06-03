import {LidarMetadata_t, StatusMetadata_t} from "../types.tsx";
import {useStatus} from "../hooks/useStatus.tsx";
import {Tag} from "./Tag.tsx";
import {RosServiceWidget} from "./service_widget/RosServiceWidget.tsx";
import {PcapServiceWidget} from "./service_widget/PcapServiceWidget.tsx";

export interface SensorStatusItemProps_t {
    lidarMetadata: LidarMetadata_t;
    statusMetadata: StatusMetadata_t;
}
export function SensorStatusItem({ lidarMetadata, statusMetadata }: SensorStatusItemProps_t) {

    const { lidar_id, site_id, street, cross_street, corner} = lidarMetadata;
    const { isPending: statusPending, error: statusError, data: status} = useStatus(lidar_id, site_id);

    return (
        <div className='flex flex-col gap-4 bg-neutral-100 rounded p-4'>
            <div className='flex flex-row items-center justify-between'>
                <p className='font-medium line-clamp-2'>
                    {street} &#x2022; {cross_street}
                </p>
                <div className='flex flex-row gap-2'>
                    <Tag value={corner}/>
                    <Tag label="LIDAR ID" value={String(lidar_id)} />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <RosServiceWidget up={statusPending || statusError ? statusMetadata.rosServiceStatus.up : status!.rosServiceStatus.up }
                                  isRecording={statusPending || statusError ? statusMetadata.rosServiceStatus.isRecording : status!.rosServiceStatus.isRecording }
                                  start={statusPending || statusError ? statusMetadata.rosServiceStatus.start : status!.rosServiceStatus.start}
                                  elapsed={statusPending || statusError ? statusMetadata.rosServiceStatus.elapsed : status!.rosServiceStatus.elapsed}
                                  lidarId={lidar_id}
                                  minified />
                <PcapServiceWidget up={statusPending || statusError ? statusMetadata.pcapServiceStatus.up : status!.pcapServiceStatus.up }
                                  isRecording={statusPending || statusError ? statusMetadata.pcapServiceStatus.isRecording : status!.pcapServiceStatus.isRecording }
                                  start={statusPending || statusError ? statusMetadata.pcapServiceStatus.start : status!.pcapServiceStatus.start}
                                  elapsed={statusPending || statusError ? statusMetadata.pcapServiceStatus.elapsed : status!.pcapServiceStatus.elapsed}
                                  lidarId={lidar_id}
                                  minified />
            </div>
        </div>
    )

}