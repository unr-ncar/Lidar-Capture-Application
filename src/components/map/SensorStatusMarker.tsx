import {PcapService_t, RosService_t} from "../../types.tsx";
import {StatusMarker} from "./StatusMarker.tsx";
import useSensorStatusLabel from "../../hooks/useSensorStatusLabel.tsx";

export interface SensorStatusMarkerProps_t {
    longitude: number;
    latitude: number;
    sensorStatus: RosService_t | PcapService_t;
}
export function SensorStatusMarker({longitude, latitude, sensorStatus}: SensorStatusMarkerProps_t) {

    const status = useSensorStatusLabel(sensorStatus);
    return <StatusMarker status={status} longitude={longitude} latitude={latitude} />

}