import {DatabaseMetadata_t} from "../types.tsx";
import {Tag} from "./Tag.tsx";
import {DropdownMenu, DropdownMenuItem} from "./DropdownMenu.tsx";
import {
    ArrowDownTrayIcon,
    InformationCircleIcon,
    MinusIcon,
    PlusIcon
} from "@heroicons/react/20/solid";

export interface DatabaseItemProps_t {
}

export function DatabaseItem(props: DatabaseMetadata_t) {

    const {lidar_id, site_id, filename, file_size,} = props;

    return (
        <div className='bg-neutral-100 px-4 py-3 flex flex-row items-center gap-2 rounded-md'>
            <div className='flex flex-col gap-1'>
                <p className='text-sm font-medium line-clamp-2 break-all'>
                    {filename}
                </p>
                <div className='flex flex-row gap-2'>
                    <Tag label="SITE ID" value={lidar_id}/>
                    <Tag label="LIDAR ID" value={site_id}/>
                    <Tag label="FILE SIZE" value={file_size}/>
                </div>
            </div>
            <DropdownMenu label="OPTIONS">
                <DropdownMenuItem icon={<MinusIcon/>} label="UNSELECT"/>
                <DropdownMenuItem icon={<PlusIcon/>} label="SELECT"/>
                <DropdownMenuItem icon={<ArrowDownTrayIcon/>} label="DOWNLOAD"/>
                <DropdownMenuItem icon={<InformationCircleIcon/>} label="VIEW MORE"/>
            </DropdownMenu>
        </div>
    )
}