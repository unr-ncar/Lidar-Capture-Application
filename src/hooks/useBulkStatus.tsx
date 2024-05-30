import {gql, request} from "graphql-request";
import {
    ServicesStatusInformation_t,
    StatusMetadataComposite_t,
    StatusResponse_t,
    StorageInformation_t
} from "../types.tsx";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";

const fetchBulkStatus = async (gatewayIp: string, siteIds: Array<number>): Promise<StatusResponse_t> => {
    const url: string = `${gatewayIp}/graphql`
    const query: string = gql`
        query {
          getStatus(siteIds: [${siteIds.join(',')}]) {
            crossStreet
            street
            siteId
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
          getSystemInfo(siteIds: [${siteIds.join(',')}]) {
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


export default function useBulkStatus(siteIds: Array<number>): UseQueryResult<Array<StatusMetadataComposite_t>> {

    const graphqlServiceUrl = useGatewayConfiguration((state) => state.graphqlServiceUrl)

    return useQuery({
        queryKey: ['bulk_status', siteIds],
        queryFn: async (): Promise<StatusResponse_t> => fetchBulkStatus(graphqlServiceUrl, siteIds),
        select: (bulkStatus: StatusResponse_t) => {

            return bulkStatus['getStatus'].map((serviceStatus: ServicesStatusInformation_t) => {

                const systemStatus = bulkStatus['getSystemInfo'].find((systemStatus: StorageInformation_t) => systemStatus.siteId === serviceStatus.siteId)

                return {
                    siteId: serviceStatus.siteId,
                    street: serviceStatus.street,
                    crossStreet: serviceStatus.crossStreet,
                    pcapServiceStatus: serviceStatus.pcapService,
                    rosServiceStatus: serviceStatus.rosService,
                    edgeStorageStatus: systemStatus
                }
            })
        },
        enabled: (siteIds.length > 0)
    })

}