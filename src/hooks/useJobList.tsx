import {useQueryClient} from "@tanstack/react-query";
import {LidarSelection_t} from "../routes/capture/types.capture.tsx";
const useJobList = (selections_queryKey: [string, number]): Array<LidarSelection_t> => {

    const queryClient = useQueryClient()

        if (queryClient.getQueryData(selections_queryKey) === undefined) return []

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return queryClient.getQueryData(selections_queryKey).items.filter((selection: LidarSelection_t) => {
            return selection.pcap_selected || selection.ros_selected
        })

}
export default useJobList