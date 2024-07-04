import {DatabaseMetadata_t} from "../types.tsx";
import {Tag} from "./Tag.tsx";
import {DropdownMenu, DropdownMenuItem} from "./DropdownMenu.tsx";
import {
    ArrowDownTrayIcon, InformationCircleIcon, SignalIcon, ServerIcon, DocumentIcon, VideoCameraIcon, ClockIcon
} from "@heroicons/react/16/solid";
import useGatewayConfiguration from "../hooks/useGatewayConfiguration.tsx";
import {useMemo} from "react";
import {useNavigate} from "react-router-dom";

export function DatabaseItem({path, lidar_id, site_id, filename, file_size, datetime}: DatabaseMetadata_t) {

    const navigate = useNavigate();
    const clusterWebServerUrl = useGatewayConfiguration((state) => state.clusterWebServerUrl)
    const downloadUrl = `${clusterWebServerUrl}/${path}${filename}`

    const displayedFileSize = useMemo(() => {
        return `${(Number(file_size) / Math.pow(1024, 3)).toFixed(2)} GB`
    }, [file_size])

    const displayedType = useMemo(() => path.replace('/', ''), [path])

    const displayedTimestamp = useMemo(() => {
        const datetimeObject = new Date(datetime * 1000).toLocaleString()
        return `${datetimeObject}`
    }, [datetime])

    const gotoMetadata = () => {
        navigate(`/metadata/file/${lidar_id}/${filename}`)
    }

    return (
        <div className='bg-neutral-100 px-4 py-3 flex flex-col gap-4 rounded-md md:flex-row md:justify-between md:items-center'>
            <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium line-clamp-2 break-all'>
                    {filename}
                </p>
                <div className='flex flex-row flex-wrap gap-2'>
                    <Tag icon={<SignalIcon />} label="LIDAR ID" value={site_id}/>
                    <Tag icon={<ServerIcon />} label="SITE ID" value={lidar_id}/>
                    <Tag icon={<DocumentIcon />} label="FILE SIZE" value={`${displayedFileSize} GB`}/>
                    <Tag icon={<VideoCameraIcon />} label="TYPE" value={displayedType}/>
                    <Tag icon={<ClockIcon />} label="TIMESTAMP" value={displayedTimestamp}/>
                </div>
            </div>
            <DropdownMenu label="OPTIONS" anchor='bottom end'>
                <DropdownMenuItem icon={<ArrowDownTrayIcon/>} label="DOWNLOAD" href={downloadUrl}/>
                <DropdownMenuItem icon={<InformationCircleIcon/>} label="VIEW MORE" onClick={gotoMetadata} />
            </DropdownMenu>
        </div>
    )
}