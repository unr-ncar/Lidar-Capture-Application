import {gql, request} from "graphql-request";
import {BulkStatusResponse_t} from "../types.tsx";
import {useQuery} from "@tanstack/react-query";

const fetchBulkStatus = async (gatewayIp: string, lidarId: number, siteId: number): Promise<BulkStatusResponse_t> => {

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
          getSystemInfo(siteIds: ${siteId}) {
            totalSpace
            usedSpace
            freeSpace
            host
            siteId
          }
        }
    `

    return request(url, query)

};

export default function useBulkStatus(gatewayIp: string, lidarId: number, siteId: number) {

    return useQuery({
        queryKey: ['bulk_status', lidarId],
        queryFn: async (): Promise<BulkStatusResponse_t> => fetchBulkStatus(gatewayIp, lidarId, siteId)
    })

}