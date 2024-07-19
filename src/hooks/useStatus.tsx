import {gql, request} from "graphql-request";
import {StatusResponse_t, StatusMetadata_t, PcapService_t, RosService_t} from "../types.tsx";
import {useQuery, UseQueryResult} from "@tanstack/react-query";
import useGatewayConfiguration from "./useGatewayConfiguration.tsx";

export interface useStatusProps_t {
    siteId: number;
    lidarId?: number;
    fileInformationIncluded?: boolean;
}
export function useStatus({siteId, lidarId, fileInformationIncluded}: useStatusProps_t): UseQueryResult<StatusMetadata_t> {

    const graphqlServiceUrl = useGatewayConfiguration((state) => state.graphqlServiceUrl)

    return useQuery({
        queryKey: ['status', siteId],
        queryFn: async (): Promise<StatusResponse_t> => {
            const url: string = `${graphqlServiceUrl}/graphql`
            const query: string = fileInformationIncluded ? gql`
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
                      fileInformation {
                        fileName
                        fileSize
                        creationTime
                        lastModified
                      }
                    }
                    rosService {
                      up
                      lidarId
                      start
                      elapsed
                      isRecording
                      fileInformation {
                        fileName
                        fileSize
                        creationTime
                        lastModified
                      }
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
            ` : gql`
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
                }`

            return request(url, query)

        },
        select: (status: StatusResponse_t): StatusMetadata_t => {
            return {
                siteId: status['getStatus'][0].siteId,
                street: status['getStatus'][0].street,
                crossStreet: status['getStatus'][0].crossStreet,
                pcapServiceStatus: lidarId ? status['getStatus'][0]['pcapService'].filter((pcapServiceStatus: PcapService_t) => pcapServiceStatus.lidarId === lidarId)[0] : status['getStatus'][0]['pcapService'],
                rosServiceStatus: lidarId ? status['getStatus'][0]['rosService'].filter((rosServiceStatus: RosService_t) => rosServiceStatus.lidarId === lidarId)[0] : status['getStatus'][0]['rosService'],
                edgeStorageStatus: status['getSystemInfo'][0]
            };
        }
    })

}