import {PcapService_t, RosService_t, SensorStatusLabel_t} from "../types.tsx";
import {useMemo} from "react";

export default function useSensorStatusLabel({up, isRecording}: RosService_t | PcapService_t): SensorStatusLabel_t {

    return useMemo<SensorStatusLabel_t>(
        () => {
            if (up === undefined || isRecording === undefined) {
                return "error"
            } else if (!up) {
                return "unavailable"
            } else if (isRecording) {
                return "recording"
            } else {
                return "ready"
            }
        },
        [isRecording, up]
    );

}