import {LidarMetadata_t} from "./rest.tsx";
import axios from "axios";

const requestSiteMetadata = async (gateway_ip: string, site_id: number): Promise<Array<LidarMetadata_t>> => {

    const url: string = `${gateway_ip}/metadata?site_id=${site_id}`
    const response = await axios.get(url);

    if (response.data.items.length == 0) {
        throw new Error('Site record cannot be identified.')
    }

    return response.data.items

}
export default requestSiteMetadata