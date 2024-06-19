import {LidarMetadata_t, RecordingFormat} from "../types.tsx";
import {Checkbox} from "@headlessui/react";
import {useStatus} from "../hooks/useStatus.tsx";
import {Tag} from "./Tag.tsx";
import useSensorStatusLabel from "../hooks/useSensorStatusLabel.tsx";
import useStorageStatusLabel from "../hooks/useStorageStatusLabel.tsx";

export interface SensorSelectionItemProps_t {
    selected: () => boolean;
    format: RecordingFormat;
    toggleFunction: () => void;
    lidarMetadata: LidarMetadata_t;
}
export function SensorSelectionItem({selected, toggleFunction, format, lidarMetadata}: SensorSelectionItemProps_t) {

    const { lidar_id, site_id, street, cross_street, corner} = lidarMetadata;
    const {isPending: statusPending, error: statusError, data: status} = useStatus(lidar_id, site_id)

    return (
        <Checkbox disabled={statusPending} className='group flex flex-col gap-4 bg-neutral-100 rounded p-4' checked={selected()} onChange={toggleFunction}>
            <div className='flex flex-row items-center justify-between'>
                <p className='font-medium line-clamp-2'>
                    {street} &#x2022; {cross_street}
                </p>
                <div className='flex flex-row gap-2'>
                    <Tag value={corner}/>
                    <Tag label="LIDAR ID" value={String(lidar_id)}/>
                </div>
            </div>
            <div>
                <p className='hidden group-data-[checked]:block'>
                    Checked
                </p>
                <p className='block group-data-[checked]:hidden'>
                    Ready
                </p>
            </div>
        </Checkbox>
    )
}