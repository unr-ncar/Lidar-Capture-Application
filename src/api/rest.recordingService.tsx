import axios from "axios";

const requestStartPcapService = async (gateway_ip: string, lidar_id: number) => {

    const url: string = `${gateway_ip}:40001/start/${lidar_id}`
    return await axios.get(url)

}

const requestStopPcapService = async (gateway_ip: string, lidar_id: number) => {

    const url: string = `${gateway_ip}:40001/stop/${lidar_id}`
    return await axios.get(url)

}
const requestStartRosService = async (gateway_ip: string, lidar_id: number) => {

    const url: string = `${gateway_ip}:40000/start/${lidar_id}`
    return await axios.get(url)

}
const requestStopRosService = async (gateway_ip: string, lidar_id: number) => {

    const url: string = `${gateway_ip}:40000/stop/${lidar_id}`
    return await axios.get(url)

}

export { requestStartPcapService, requestStopPcapService, requestStartRosService, requestStopRosService }