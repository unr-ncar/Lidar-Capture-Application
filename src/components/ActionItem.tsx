import {InformationCircleIcon} from "@heroicons/react/16/solid";
import {Tag} from "./Tag.tsx";
import {XMarkIcon} from "@heroicons/react/20/solid";
import {LidarSelection_t} from "../types.tsx";
import {ReactElement, useMemo} from "react";
import useSensorSelections from "../hooks/useSensorSelections.tsx";
export function ActionItem(selection: LidarSelection_t) {

    const toggleSelection = useSensorSelections((state) => state.toggleSelection);

    const shownTags = useMemo<undefined | ReactElement>(() => {
        return (
            <>
                {
                    selection.selectedFormats.map((format) => {
                        return <Tag value={format.toUpperCase()} icon={<XMarkIcon/>} onClick={() => toggleSelection(selection.item.lidar_id, format)} />
                    })
                }
            </>
        )
    }, [selection.item.lidar_id, selection.selectedFormats, toggleSelection]);

    if (selection.selectedFormats.length === 0) return undefined;

  return (
    <div className="flex flex-row-reverse items-center bg-neutral-100 gap-1.5 rounded p-4">
        <Tag icon={<InformationCircleIcon />} label="LIDAR ID" value="4" onClick={() => console.log("LIDAR ID")} />
        <div className="flex flex-col gap-1.5 w-full">
            <p className="font-medium line-clamp-2">
                {selection.item.street} &#x2022; {selection.item.cross_street} <span className='uppercase'>({selection.item.corner})</span>
            </p>
            <div className="flex flex-row gap-1.5 items-center">
                {shownTags}
            </div>
        </div>
    </div>
  );
}
