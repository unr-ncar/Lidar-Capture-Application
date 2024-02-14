import {DataFormat_t} from "../routes/capture/types.capture.tsx";
import {useMutation} from "@tanstack/react-query";
import {
    requestStartPcapService,
    requestStartRosService,
    requestStopPcapService,
    requestStopRosService
} from "../api/rest.recordingService.tsx";
import {PcapService_response_t, RosService_response_t} from "../api/rest.tsx";

interface useCaptureJob_t {
    data: {
        success: boolean;
        message: string;
    } | undefined;
    isPending: boolean;
    error: Error | null;
    execute: () => void;
}
const useCaptureJob = (lidar_id: number, format: DataFormat_t, operation: 'start' | 'stop'): useCaptureJob_t => {

    const createJob = async (): Promise<PcapService_response_t | RosService_response_t> => {
        console.log('HITTING ENDPOINT')
        let result;

        if (format === 'pcap' && operation === 'start') {
            result = await requestStartPcapService('http://134.197.75.31', lidar_id);
        } else if (format === 'pcap' && operation === 'stop') {
            result = await requestStopPcapService('http://134.197.75.31', lidar_id);
        } else if (format === 'ros' && operation === 'start') {
            result = await requestStartRosService('http://134.197.75.31', lidar_id);
        } else {
            result = await requestStopRosService('http://134.197.75.31', lidar_id);
        }

        if (!result.success) throw new Error(result.message)

        return result;

    }

    const {data, isPending, error, mutate} = useMutation({
        mutationKey: ['job', operation , format, lidar_id],
        mutationFn: async (): Promise<PcapService_response_t | RosService_response_t> => createJob(),
    })

    return {
        isPending,
        error,
        data,
        execute: mutate,
    }


}
export default useCaptureJob;