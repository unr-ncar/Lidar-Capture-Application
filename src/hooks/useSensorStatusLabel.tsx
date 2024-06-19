import {PcapService_t, RosService_t, SensorStatusLabel_t} from "../types.tsx";
import {useMemo} from "react";

export default function useSensorStatusLabel(props: RosService_t | PcapService_t | undefined): SensorStatusLabel_t {

    return useMemo<SensorStatusLabel_t>(
        () => {
            if (props === undefined || props.up === undefined || props.isRecording === undefined) {
                return "error"
            } else if (!props.up) {
                return "unavailable"
            } else if (props.isRecording) {
                return "recording"
            } else {
                return "ready"
            }
        },
        [props]
    );

}