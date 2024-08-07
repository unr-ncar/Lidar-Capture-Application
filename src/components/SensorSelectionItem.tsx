import {LidarMetadata_t, RecordingFormat, RecordingOperation} from "../types.tsx";
import {Checkbox} from "@headlessui/react";
import {useStatus} from "../hooks/useStatus.tsx";
import {Tag} from "./Tag.tsx";
import useSensorStatusLabel from "../hooks/useSensorStatusLabel.tsx";
import useStorageStatusLabel from "../hooks/useStorageStatusLabel.tsx";
import {InformationCircleIcon} from "@heroicons/react/16/solid";
import {
    MinusIcon,
    PlusIcon,
    VideoCameraIcon,
    ExclamationTriangleIcon,
    VideoCameraSlashIcon
} from "@heroicons/react/20/solid";
import Loading from "react-loading";
import {useNavigate} from "react-router-dom";

export interface SensorSelectionItemProps_t {
    selected: () => boolean;
    format: RecordingFormat;
    toggleFunction: () => void;
    lidarMetadata: LidarMetadata_t;
    operation: RecordingOperation;
    statusOverride?: boolean;
}

export function SensorSelectionItem({
                                        selected,
                                        toggleFunction,
                                        format,
                                        operation,
                                        lidarMetadata,
                                        statusOverride
                                    }: SensorSelectionItemProps_t) {

    const navigate = useNavigate();
    const {lidar_id, site_id, street, cross_street, corner} = lidarMetadata;
    const {isPending: statusPending, data: status} = useStatus({
        siteId: Number(site_id),
        lidarId: Number(lidar_id)
    })
    const sensorStatus = useSensorStatusLabel(statusPending ? undefined : format === "ros" ? status!.rosServiceStatus : status!.pcapServiceStatus)
    const storageStatus = useStorageStatusLabel(statusPending ? undefined : status!.edgeStorageStatus)

    const selectionDisabled = () => {

        if (statusOverride) {
            if (operation === 'start') {
                return !(storageStatus === 'critical')
            } else {
                !(sensorStatus === "recording")
            }
        } else {
            if (operation === 'start') {
                return !((sensorStatus === 'ready') && (storageStatus === 'stable'));
            } else {
                return !(sensorStatus === "recording")
            }
        }
    }

    const selectionFlag = () => {

        let backgroundColor = null;
        let textColor = null;
        let flagIcon = null;

        if (operation === 'start') {
            if (sensorStatus === 'recording') {
                textColor = 'text-white'
                backgroundColor = 'bg-red-400'
                flagIcon = <VideoCameraIcon className='size-4'/>
            } else if ((sensorStatus === 'unavailable') || (sensorStatus === 'error') || (storageStatus === 'error') || (storageStatus === 'unstable')) {
                textColor = 'text-white'
                backgroundColor = 'bg-yellow-500'
                flagIcon = <ExclamationTriangleIcon className='size-4'/>
            } else if (selected()) {
                textColor = 'text-white'
                backgroundColor = 'bg-green-600'
                flagIcon = <MinusIcon className='size-4'/>
            } else {
                textColor = 'text-neutral-500'
                backgroundColor = 'bg-neutral-300'
                flagIcon = <PlusIcon className='size-4'/>
            }
        } else {
            if (sensorStatus === 'recording' && selected()) {
                textColor = 'text-white'
                backgroundColor = 'bg-green-600'
                flagIcon = <MinusIcon className='size-4'/>
            } else if (sensorStatus === 'recording' && !selected()) {
                textColor = 'text-neutral-500'
                backgroundColor = 'bg-neutral-300'
                flagIcon = <PlusIcon className='size-4'/>
            } else {
                textColor = 'text-neutral-500'
                backgroundColor = 'bg-neutral-300'
                flagIcon = <VideoCameraSlashIcon className='size-4'/>
            }
        }

        if (statusPending) {
            textColor = 'text-white'
            backgroundColor = 'bg-slate-600'
            flagIcon = <Loading type='spin' width={15} height={15}/>;
        }

        const containerStyling = `${backgroundColor} ${textColor} transition-colors flex justify-center items-center min-h-[30px] max-h-[30px] min-w-[30px] max-w-[30px] rounded-md`
        return (
            <div className={containerStyling}>
                {flagIcon}
            </div>
        )

    }

    const navigateSensorMetadata = () => {
        navigate(`/metadata/sensor/${lidarMetadata.site_id}/${lidarMetadata.lidar_id}`)
    }

    return (
        <Checkbox disabled={statusPending || selectionDisabled()}
                  className={`group ${statusPending ? 'hover:data-[disabled]:cursor-wait' : 'hover:data-[disabled]:cursor-not-allowed'} flex flex-row items-center gap-3 bg-neutral-100 rounded p-4`}
                  checked={selected()} onChange={toggleFunction}>
            {selectionFlag()}
            <div className='flex flex-row gap-4 justify-between items-center w-full'>
                <p className='font-medium line-clamp-2'>
                    {street} &#x2022; {cross_street} ({corner})
                </p>
                <Tag icon={<InformationCircleIcon />} label="LIDAR ID" value={String(lidar_id)} onClick={() => navigateSensorMetadata()}/>
            </div>
        </Checkbox>
    )
}