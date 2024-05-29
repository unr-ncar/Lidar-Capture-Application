import {PcapService_t} from "../../types.tsx";
import {ServiceWidget} from "./ServiceWidget.tsx";
import {SignalIcon} from "@heroicons/react/20/solid";
import useSensorStatusLabel from "../../hooks/useSensorStatusLabel.tsx";

export function PcapServiceWidget(props: PcapService_t) {

    const status = useSensorStatusLabel(props);
    const { lidarId } = props

    return (
        <ServiceWidget serviceIcon={<SignalIcon />} serviceLabel={`PCAP SERVICE (LIDAR ID: ${lidarId})`} status={status} />
    )
}