import { gql } from "graphql-request";
import useGraphqlService from "./useGraphqlService.ts";

export default function useRecordingStatus(siteIds: Array<number>) {

    const query = gql`query {
        getStatus(siteIds: [${siteIds}]) {
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

    return useGraphqlService("getRecordingStatus", query)


}