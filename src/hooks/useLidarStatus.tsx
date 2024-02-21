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
interface useLidarStatus_t {
    isPending: boolean;
    error: Error | null;
    data: LidarStatus_t | undefined;
}
const useLidarStatus = (lidarId: number): useLidarStatus_t => {

    const {isPending, error, data} = useQuery({
        queryKey: ['lidar_status', lidarId],
        queryFn: async () => fetchLidarStatus('http://134.197.75.31:31538/graphql', lidarId)
    })

    return {
        isPending,
        error,
        data
    }
}
export default useLidarStatus;