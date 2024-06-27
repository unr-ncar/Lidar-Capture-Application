import {DatabaseMetadata_t} from "../types.tsx";
import {Tag} from "./Tag.tsx";
import {DropdownMenu, DropdownMenuItem} from "./DropdownMenu.tsx";
import {
    ArrowDownTrayIcon,
    InformationCircleIcon,
} from "@heroicons/react/20/solid";
import useGatewayConfiguration from "../hooks/useGatewayConfiguration.tsx";

export function DatabaseItem({path, lidar_id, site_id, filename, file_size}: DatabaseMetadata_t) {

    const clusterWebServerUrl = useGatewayConfiguration((state) => state.clusterWebServerUrl)
    const downloadUrl = `${clusterWebServerUrl}/${path}${filename}`

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
                <a href={downloadUrl}>
                    download
                </a>
            </div>
            <DropdownMenu label="OPTIONS">
                <DropdownMenuItem icon={<ArrowDownTrayIcon/>} label="DOWNLOAD"></DropdownMenuItem>
                <DropdownMenuItem icon={<InformationCircleIcon/>} label="VIEW MORE"/>
            </DropdownMenu>
        </div>
    )
}