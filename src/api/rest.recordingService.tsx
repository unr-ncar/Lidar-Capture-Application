import axios from "axios";
import {PcapService_response_t, RosService_response_t} from "./rest.tsx";

const requestStartPcapService = async (site_ip: string, deployment_id: number): Promise<PcapService_response_t> => {

    const url: string = `${site_ip}:40001/start/${deployment_id}`
    console.log(url)
    return await axios.get(url)

}

const requestStopPcapService = async (site_ip: string, deployment_id: number): Promise<PcapService_response_t> => {

    const url: string = `${site_ip}:40001/stop/${deployment_id}`
    return await axios.get(url)

}
const requestStartRosService = async (site_ip: string, deployment_id: number): Promise<RosService_response_t> => {

    const url: string = `${site_ip}:40000/start/${deployment_id}`
    console.log(url)
    return await axios.get(url)

}
const requestStopRosService = async (site_ip: string, deployment_id: number): Promise<RosService_response_t> => {

    const url: string = `${site_ip}:40000/stop/${deployment_id}`
    console.log(url)
    return await axios.get(url)

}

export { requestStartPcapService, requestStopPcapService, requestStartRosService, requestStopRosService }