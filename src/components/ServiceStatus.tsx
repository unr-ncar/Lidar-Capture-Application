import {PcapService_t, RecordingFormat, RosService_t} from "../types.tsx";
import {VideoCameraIcon, ExclamationTriangleIcon, CheckCircleIcon} from "@heroicons/react/20/solid";

export interface ServiceStatusProps_t {
    service: RecordingFormat;
    rosServiceInformation?: RosService_t;
    pcapServiceInformation?: PcapService_t;
}

export default function ServiceStatus({service, rosServiceInformation, pcapServiceInformation}: ServiceStatusProps_t) {

    // Yellow - service is down
    // Green - service is available
    // Red - service is recording

    const statusIcon = () => {
        if (service === 'ros') {
            if (rosServiceInformation?.isRecording) {
                return <VideoCameraIcon />
            } else if (!rosServiceInformation?.up) {
                return <ExclamationTriangleIcon />
            } else {
                return <CheckCircleIcon/>
            }
        }

        if (service === 'pcap') {
            if (pcapServiceInformation?.isRecording) {
                return <VideoCameraIcon/>
            } else if (!pcapServiceInformation?.up) {
                return <ExclamationTriangleIcon/>
            } else {
                return <CheckCircleIcon/>
            }
        }
    }

    const statusInformation = () => {
        if (service === 'ros') {
            if (rosServiceInformation?.isRecording) {
                return "Service is currently recording."
            } else if (!rosServiceInformation?.up) {
                return "Service is currently unavailable."
            } else {
                return "Ready for capture."
            }
        }

        if (service === 'pcap') {
            if (pcapServiceInformation?.isRecording) {
                return "Service is currently recording."
            } else if (!pcapServiceInformation?.up) {
                return "Service is currently unavailable."
            } else {
                return "Ready for capture."
            }
        }
    }

    const statusBackground = () => {

        const serviceUpBackground = 'bg-gradient-to-tr from-green-400 to-green-600'
        const serviceDownBackground = 'bg-gradient-to-tr from-yellow-400 to-yellow-600'
        const serviceRecordingBackground = 'bg-gradient-to-tr from-red-400 to-red-600'

        if (service === 'ros') {
            if (rosServiceInformation?.isRecording) {
                return serviceRecordingBackground
            } else if (!rosServiceInformation?.up) {
                return serviceDownBackground
            } else {
                return serviceUpBackground
            }
        }

        if (service === 'pcap') {
            if (pcapServiceInformation?.isRecording) {
                return serviceRecordingBackground
            } else if (!pcapServiceInformation?.up) {
                return serviceDownBackground
            } else {
                return serviceUpBackground
            }
        }
    }

    return (
        <div className={`${statusBackground()} flex flex-row gap-3 p-3 rounded-md align-middle`}>
            <div className='flex flex-col place-content-center'>
                <div className='flex flex place-items-center [&>*]:size-8'>
                    {statusIcon()}
                </div>
            </div>
            <div className='flex flex-col align-middle'>
                <p className='text-xs font-semibold'>
                    {service === "ros" && "ROS SERVICE"}
                    {service === "pcap" && "PCAP SERVICE"}
                </p>
                <p className=''>
                    {statusInformation()}
                </p>
            </div>
        </div>
    )

}
