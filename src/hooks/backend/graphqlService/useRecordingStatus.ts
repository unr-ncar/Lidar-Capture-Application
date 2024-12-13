import { gql } from "graphql-request";
import useGraphqlService from "./useGraphqlService.ts";

export default function useRecordingStatus(lidarIds: Array<number>, isEnabled: boolean = true) {

    const query = gql`query {
        getStatus(lidarIds: [${lidarIds}]) {
            siteId
            rosService {
                isRecording
                start
                elapsed
                lidarId
                corner
                up
            } 
            pcapService {
                isRecording
                start
                elapsed
                lidarId
                corner
                up
            }
        }
    }`

    return useGraphqlService("getRecordingStatus", query, 1, {
        enabled: isEnabled
    })


}