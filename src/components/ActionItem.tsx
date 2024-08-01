import {InformationCircleIcon} from "@heroicons/react/16/solid";
import {Tag} from "./Tag.tsx";
import {XMarkIcon} from "@heroicons/react/20/solid";

export interface ActionItemProps_t {}
export function ActionItem() {
  return (
    <div className="flex flex-col bg-neutral-100 gap-1.5 rounded p-4">
        <div className="flex flex-row gap-4 justify-between items-center w-full">
            <p className="font-medium line-clamp-2">
                Virginia St. &#x2022; Artemesia St. (NE)
            </p>
            <div className="flex flex-row gap-1.5 items-center">
                <button className='flex flex-row items-center gap-0.5 bg-neutral-200 text-neutral-400 leading-none text-sm px-2 py-1 rounded-md font-medium'>
                    <span className='*:size-4'>
                        <XMarkIcon />
                    </span>
                    PCAP
                </button>
                <button className='hidden flex flex-row items-center gap-0.5 bg-neutral-200 text-neutral-400 leading-none px-2 text-sm py-1 rounded-md font-medium'>
                                        <span className='*:size-4'>
                        <XMarkIcon/>
                    </span>
                    ROS
                </button>
            </div>
        </div>
    </div>
  );
}
