import {gql, request} from "graphql-request";
import {status_information_response_t} from "./graphql.tsx";

const requestLidarRecordingStatus = async (gateway_ip: string, lidar_id: number): Promise<status_information_response_t> => {

    const url: string = `${gateway_ip}/graphql`
    const query: string = gql`
        query {
          getStatus(lidarIds: ${lidar_id}) {
            pcapService {
              lidarId
              isRecording
            }
            rosService {
              lidarId
              isRecording
            }
          }
        }
    `

    return request(url, query)

}

export default requestLidarRecordingStatus