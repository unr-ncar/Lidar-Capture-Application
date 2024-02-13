import axios from "axios";
import {LidarMetadata_t} from "./rest.tsx";

const requestLidarMetadata = async (gateway_ip: string, lidar_id: number): Promise<LidarMetadata_t> => {

    const url: string = `${gateway_ip}/metadata?lidar_id=${lidar_id}`
    const response = await axios.get(url);

    if (response.data.items.length == 0) {
        throw new Error('Lidar record cannot be identified.')
    }

    return response.data.items.filter((lidar: LidarMetadata_t) => lidar.lidar_id = lidar_id)[0]

}
export default requestLidarMetadata