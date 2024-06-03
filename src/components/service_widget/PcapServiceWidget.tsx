import {PcapService_t} from "../../types.tsx";
import {ServiceWidget} from "./ServiceWidget.tsx";
import {SignalIcon} from "@heroicons/react/20/solid";
import useSensorStatusLabel from "../../hooks/useSensorStatusLabel.tsx";

export interface PcapServiceWidgetProps_t extends PcapService_t {
    minified?: boolean;
}
export function PcapServiceWidget(props: PcapServiceWidgetProps_t) {

    const status = useSensorStatusLabel(props);
    const { lidarId, minified } = props

    const label = minified ? `PCAP SERVICE` : `PCAP SERVICE (LIDAR ID: ${lidarId})`

    return (
        <ServiceWidget serviceIcon={<SignalIcon />} serviceLabel={label} status={status} />
    )
}