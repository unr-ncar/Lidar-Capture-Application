import {gql, request} from "graphql-request";
import {useQuery} from "@tanstack/react-query";

interface PcapService_t {
    isRecording: boolean;
    start: number;
    elapsed: number;
    lidarId: number;
}
interface RosService_t {
    isRecording: boolean;
    start: number;
    elapsed: number;
    lidarId: number;
}
interface StorageInformation_t {
    totalSpace: number;
    usedSpace: number;
    freeSpace: number;
    host: string;
    siteId: number;
}
interface StatusInformation_t {
    pcapService: Array<PcapService_t>;
    rosService: Array<RosService_t>;
}
interface LidarStatus_t {
    getStatus: Array<StatusInformation_t>
    getSystemInfo?: Array<StorageInformation_t>
}
const fetchLidarStatus = async (gatewayIp: string, lidarId: number): Promise<LidarStatus_t> => {

    const url: string = `${gatewayIp}/graphql`
    const query: string = gql`
        query {
          getStatus(lidarIds: ${lidarId}) {
            pcapService {
              lidarId
              start
              elapsed
              isRecording
            }
            rosService {
              lidarId
              start
              elapsed
              isRecording
            }
          }
          getSystemInfo(lidarIds: ${lidarId}) {
            totalSpace
            usedSpace
            freeSpace
            host
            siteId
          }
        }
    `

    return request(url, query)

}
export interface useStatus_t {
    isLoading: boolean;
    error: Error | null;
    storage: StorageInformation_t | undefined;
    services: {
        pcapRecordingServiceActive: (lidar_id: number) => boolean | undefined,
        rosRecordingServiceActive: (lidar_id: number) => boolean | undefined
    };
}
const useLidarStatus = (lidarId: number): useStatus_t => {

    const {isPending, error, data} = useQuery({
        queryKey: ['lidar_status', lidarId],
        queryFn: async () => fetchLidarStatus('http://134.197.75.31:31538', lidarId)
    })


    function serializePCAPService(lidar_id: number): boolean | undefined {
        // @ts-expect-error If used correctly with isLoading, the status should not be undefined.
        return data?.getStatus && data?.getStatus[0].pcapService && data?.getStatus[0].pcapService.find((service: pcap_service_t) => service.lidarId === lidar_id).isRecording;
    }
    function serializeROSService(lidar_id: number): boolean | undefined {
        // @ts-expect-error If used correctly with isLoading, the status should not be undefined.
        const status = data?.getStatus && data?.getStatus[0].rosService && data?.getStatus[0].rosService.find((service: ros_service_t) => service.lidarId === lidar_id).isRecording;
        return status && status;
    }

    if (isPending) {
        return {
            isLoading: isPending,
            error: null,
            storage: undefined,
            services: {
                pcapRecordingServiceActive: serializePCAPService,
                rosRecordingServiceActive: serializeROSService
            }
        }
    }

    if (error || data?.getSystemInfo === undefined || data?.getSystemInfo[0] === undefined || data?.getStatus === undefined || data?.getStatus[0] === undefined) {
        return {
            isLoading: isPending,
            error: new Error('Failed to communicate to edge computer.'),
            storage: undefined,
            services: {
                pcapRecordingServiceActive: serializePCAPService,
                rosRecordingServiceActive: serializeROSService
            }
        }
    }

    return {
        isLoading: isPending,
        error: error,
        storage: data.getSystemInfo[0],
        services: {
            pcapRecordingServiceActive: serializePCAPService,
            rosRecordingServiceActive: serializeROSService
        }
    }

}
export default useLidarStatus;