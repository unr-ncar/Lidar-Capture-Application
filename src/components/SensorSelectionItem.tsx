import { LidarSelection_t, RecordingFormat} from "../types.tsx";
import {Checkbox} from "@headlessui/react";

export interface SensorSelectionItemProps_t {
    selected: boolean;
    toggleFunction: () => void;
    format: RecordingFormat;
    lidarSelection: LidarSelection_t;
}
export function SensorSelectionItem({selected, toggleFunction, format, lidarSelection}: SensorSelectionItemProps_t) {

    const { lidar_id, site_id, street, cross_street, corner} = lidarSelection.item;

    return (
        <Checkbox className='group' checked={selected} onChange={toggleFunction}>
            <div>
                <p>
                    {street} &#x2022; {cross_street}
                </p>
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