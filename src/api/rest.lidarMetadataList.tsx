import axios from "axios";
import {LidarMetadata_response_t} from "./rest.tsx";

const requestLidarMetadataList = async (gateway_ip: string, page: number = 1, size: number = 10): Promise<LidarMetadata_response_t> => {

    const page_parameter: string = `page=${page.toString()}`
    const size_parameter: string = `size=${size.toString()}`
    const url: string = `${gateway_ip}/metadata?${page_parameter}&${size_parameter}`

    const response = await axios.get(url)

    return response.data

}
export default requestLidarMetadataList;