import {status_information_response_t} from "./graphql.tsx";
import {gql, request} from "graphql-request";

const requestBulkSiteStatus = async (gateway_ip: string, site_id: number): Promise<status_information_response_t> => {

    const url: string = `${gateway_ip}/graphql`
    const query: string = gql`
        query {
          getStatus(siteIds: ${site_id}) {
            pcapService {
              lidarId
              isRecording
            }
            rosService {
              lidarId
              isRecording
            }
          }
          getSystemInfo(siteIds: ${site_id}) {
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

export default requestBulkSiteStatus