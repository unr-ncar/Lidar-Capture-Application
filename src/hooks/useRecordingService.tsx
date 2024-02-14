import {useQueryClient} from "@tanstack/react-query";
import {LidarSelection_t} from "../routes/capture/types.capture.tsx";
export interface captureActionJob_t {
    jobList: () => Array<LidarSelection_t>
}
const useRecordingService = (selections_queryKey: [string, number]): captureActionJob_t => {

    const queryClient = useQueryClient()


    const createJobList = (): Array<LidarSelection_t> => {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return queryClient.getQueryData(selections_queryKey).items.filter((selection: LidarSelection_t) => {
            return selection.pcap_selected || selection.ros_selected
        })
    }

    return {
        jobList: createJobList
    }

}
export default useRecordingService