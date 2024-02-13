import {LidarMetadata_t} from "../../api/rest.tsx";

export type DataFormat_t = 'pcap' | 'ros'
export interface LidarSelection_t {
    lidar: LidarMetadata_t;
    pcap_selected: boolean;
    ros_selected: boolean;
}

