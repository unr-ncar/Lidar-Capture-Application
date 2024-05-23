import axios from "axios";
import {LidarMetadata_t, RecordingFormat, RecordingOperation, RecordingServiceResponse_t} from "../types.tsx";
import {useMutation} from "@tanstack/react-query";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";

export async function processPromisesBatch(
    items: Array<any>,
    limit: number,
    fn: (item: any) => Promise<any>,
): Promise<any> {
    let results: any[] = [];
    for (let start = 0; start < items.length; start += limit) {
        const end = start + limit > items.length ? items.length : start + limit;

        const slicedResults = await Promise.all(items.slice(start, end).map(fn));

        results = [
            ...results,
            ...slicedResults,
        ]
    }

    return results;
}

export function processCaptureStartRequest(siteIp: string, servicePort: number, lidarId: number) {
    return new Promise<RecordingServiceResponse_t>((resolve, reject) => {
        return axios.get(`${siteIp}:${servicePort}/start/${lidarId}`).then((response) => {
            return response.data
        }).then((data) => {
            if (!data.success) {
                reject(new Error(data))
            }
            resolve(data)
        }).catch((error) => {
            reject(error)
        })
    })
}

const callStartRecording = async (siteIp: string, servicePort: number, lidarId: number): Promise<RecordingServiceResponse_t> => {
    const url: string = `${siteIp}:${servicePort}/start/${lidarId}`
    return await axios.get(url)
}
const callStopRecording = async (siteIp: string, servicePort: number, lidarId: number): Promise<RecordingServiceResponse_t> => {
    const url: string = `${siteIp}:${servicePort}/stop/${lidarId}`
    return await axios.get(url)
}

export default function useCaptureServices(lidar: LidarMetadata_t, format: RecordingFormat, operation: RecordingOperation) {

    const rosRecordingServicePort = useGatewayConfiguration((state) => state.configuration.rosRecordingServicePort)
    const pcapRecordingServicePort = useGatewayConfiguration((state) => state.configuration.pcapRecordingServicePort)

    const startPcapCapture = useMutation({
        mutationKey: ['service_job', lidar.lidar_id, format, operation],
        mutationFn: async () => callStartRecording(lidar.ip, pcapRecordingServicePort, lidar.lidar_id)
    })

    const stopPcapCapture = useMutation({
        mutationKey: ['service_job', lidar.lidar_id, format, operation],
        mutationFn: async () => callStopRecording(lidar.ip, pcapRecordingServicePort, lidar.lidar_id)
    })

    const startRosCapture = useMutation({
        mutationKey: ['service_job', lidar.lidar_id, format, operation],
        mutationFn: async () => callStartRecording(lidar.ip, rosRecordingServicePort, lidar.lidar_id)
    })

    const stopRosCapture = useMutation({
        mutationKey: ['service_job', lidar.lidar_id, format, operation],
        mutationFn: async () => callStopRecording(lidar.ip, rosRecordingServicePort, lidar.lidar_id)
    })

    return {
        pcapService: {
            startOptions: startPcapCapture,
            stopOptions: stopPcapCapture
        },
        rosService: {
            startOptions: startRosCapture,
            stopOptions: stopRosCapture
        }
    }

}