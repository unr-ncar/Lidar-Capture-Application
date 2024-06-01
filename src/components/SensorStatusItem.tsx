import {LidarMetadata_t, StatusMetadata_t} from "../types.tsx";
import {useStatus} from "../hooks/useStatus.tsx";

export interface SensorStatusItemProps_t {
    lidarMetadata: LidarMetadata_t;
    lidarStatusMetadata: StatusMetadata_t;
}
export function SensorStatusItem({ lidarMetadata, lidarStatusMetadata }: SensorStatusItemProps_t) {

    const { lidar_id, site_id, street, cross_street, state} = lidarMetadata;
    const { pcapServiceStatus, rosServiceStatus, edgeStorageStatus} = lidarStatusMetadata;
    const { isPending, error, data} = useStatus(lidar_id, site_id);



    return (
        <div>

        </div>
    )

}