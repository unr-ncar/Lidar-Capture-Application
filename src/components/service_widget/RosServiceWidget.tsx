import {RosService_t} from "../../types.tsx";
import {ServiceWidget} from "./ServiceWidget.tsx";
import {SignalIcon} from "@heroicons/react/20/solid";
import useSensorStatusLabel from "../../hooks/useSensorStatusLabel.tsx";

export interface RosServiceWidgetProps_t extends RosService_t {
    minified?: boolean;
}
export function RosServiceWidget(props: RosServiceWidgetProps_t) {

    const status = useSensorStatusLabel(props);
    const { lidarId, minified } = props

    const label = minified ? `ROS SERVICE` : `ROS SERVICE (LIDAR ID: ${lidarId})`

    return (
        <ServiceWidget serviceIcon={<SignalIcon />} serviceLabel={label} status={status} />
    )
}