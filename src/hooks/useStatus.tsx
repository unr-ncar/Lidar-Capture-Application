import {useQuery} from "@tanstack/react-query";
import {pcap_service_t, ros_service_t, status_information_response_t, storage_information_t} from "../api/graphql.tsx";
import requestBulkSiteStatus from "../api/graphql.bulkSiteStatus.tsx";

export interface useStatus_t {
    isLoading: boolean;
    error: Error | null;
    storage: storage_information_t | undefined;
    services: {
        pcapRecordingServiceActive: (lidar_id: number) => boolean | undefined,
        rosRecordingServiceActive: (lidar_id: number) => boolean | undefined
    };
}
export default function useStatus(site_id: number): useStatus_t {

    const {data, isPending, error} = useQuery({
        queryKey: ['site_status', site_id],
        queryFn: async (): Promise<status_information_response_t> => requestBulkSiteStatus('http://134.197.75.31:31538', site_id),
        retry: 5
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