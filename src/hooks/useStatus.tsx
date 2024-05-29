import {gql, request} from "graphql-request";
import {StatusResponse_t, StatusMetadata_t, PcapService_t, RosService_t} from "../types.tsx";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";

const fetchStatus = async (gatewayIp: string, siteId: number): Promise<StatusResponse_t> => {
    const url: string = `${gatewayIp}/graphql`
    const query: string = gql`
        query {
          getStatus(siteIds: ${siteId}) {
            siteId
            crossStreet
            street
            pcapService {
              up
              lidarId
              start
              elapsed
              isRecording
            }
            rosService {
              up
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


export function useStatus(lidarId: number, siteId: number): UseQueryResult<StatusMetadata_t> {

    const graphqlServiceUrl = useGatewayConfiguration((state) => state.graphqlServiceUrl)

    return useQuery({
        queryKey: ['status', siteId],
        queryFn: async (): Promise<StatusResponse_t> => fetchStatus(graphqlServiceUrl, siteId),
        select: (status: StatusResponse_t): StatusMetadata_t => {
            return {
                siteId: status['getStatus'][0].siteId,
                street: status['getStatus'][0].street,
                crossStreet: status['getStatus'][0].crossStreet,
                pcapServiceStatus: status['getStatus'][0]['pcapService'].filter((pcapServiceStatus: PcapService_t) => pcapServiceStatus.lidarId === lidarId)[0],
                rosServiceStatus: status['getStatus'][0]['rosService'].filter((rosServiceStatus: RosService_t) => rosServiceStatus.lidarId === lidarId)[0],
                edgeStorageStatus: status['getSystemInfo'][0]
            };
        }
    })

}