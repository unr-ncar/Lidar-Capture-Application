import {LidarMetadata_t, RecordingFormat} from "../types.tsx";
import {Checkbox} from "@headlessui/react";
import {useStatus} from "../hooks/useStatus.tsx";
import {Tag} from "./Tag.tsx";
import useSensorStatusLabel from "../hooks/useSensorStatusLabel.tsx";
import useStorageStatusLabel from "../hooks/useStorageStatusLabel.tsx";
import {ExclamationTriangleIcon} from "@heroicons/react/16/solid";

interface SelectionTagProps_t {
    loading: boolean;
    selected: boolean;
    disabled?: boolean;
    reason: string | null;
}

function SelectionTag({loading, selected, disabled, reason}: SelectionTagProps_t) {

    if (loading) {
        return (
            <div className='w-fit px-2 py-1 rounded-md flex flex-row items-center bg-slate-600'>
                <p className='text-xs font-medium text-white'>
                    LOADING
                </p>
            </div>
        )
    }

    if (disabled) {
        return (
            <div className='w-fit px-2 py-1 rounded-md flex flex-row items-center gap-1 bg-red-400 text-white'>
                <span>
                    <ExclamationTriangleIcon className='size-4'/>
                </span>
                <p className='text-xs'>
                    <span className='font-medium'>
                        DISABLED
                    </span>
                    {' '}
                    <span className='uppercase'>
                        {reason !== null ? reason : null}
                    </span>
                </p>
            </div>
        )
    }

    return (
        <div className={`${selected ? 'bg-green-500 text-white' : 'bg-neutral-400 text-neutral-200'} w-fit px-2 py-1 rounded-md flex flex-row items-center gap-1`}>
            <p className='text-xs font-medium'>
                {selected ? "SELECTED" : "UNSELECTED"}
            </p>
        </div>
    )
}

export interface SensorSelectionItemProps_t {
    selected: () => boolean;
    format: RecordingFormat;
    toggleFunction: () => void;
    lidarMetadata: LidarMetadata_t;
}

export function SensorSelectionItem({selected, toggleFunction, format, lidarMetadata}: SensorSelectionItemProps_t) {

    const {lidar_id, site_id, street, cross_street, corner} = lidarMetadata;
    const {isPending: statusPending, data: status} = useStatus(lidar_id, site_id)
    const sensorStatus = useSensorStatusLabel(statusPending ? undefined : format === "ros" ? status?.rosServiceStatus : status!.pcapServiceStatus)
    const storageStatus = useStorageStatusLabel(statusPending ? undefined : status?.edgeStorageStatus)

    const selectionDisabled = () => {
        return !((sensorStatus === 'ready') && (storageStatus === 'stable' || storageStatus === 'critical'));
    }

    const selectionDisabledReason = () => {

        if (sensorStatus !== 'ready') {
            return sensorStatus;
        }

        if (storageStatus !== 'stable') {
            return storageStatus;
        }

        return null

    }

    return (
        <Checkbox disabled={statusPending || selectionDisabled()}
                  className={` group flex flex-col gap-2 bg-neutral-100 rounded p-4`}
                  checked={selected()} onChange={toggleFunction}>
            <div className='flex flex-row items-center justify-between'>
                <p className='font-medium line-clamp-2'>
                    {street} &#x2022; {cross_street}
                </p>
                <div className='flex flex-row gap-2'>
                    <Tag value={corner}/>
                    <Tag label="LIDAR ID" value={String(lidar_id)}/>
                </div>
            </div>
            <SelectionTag loading={statusPending} selected={selected()} disabled={selectionDisabled()}
                          reason={selectionDisabledReason()}/>
        </Checkbox>
    )
}