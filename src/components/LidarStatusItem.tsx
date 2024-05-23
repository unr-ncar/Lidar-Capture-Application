import {LidarMetadata_t, StatusMetadata_t} from "../types.tsx";
import useStatus from "../hooks/useStatus.tsx";
import {useEffect, useState} from "react";
import {Tag} from "./Tag.tsx";
import {useNavigate} from "react-router-dom";
import {StorageStatus} from "./StorageStatus.tsx";
import ServiceStatus from "./ServiceStatus.tsx";

export interface LidarStatusItemProp_t {
    lidarItem: LidarMetadata_t;
    statusMetadata: StatusMetadata_t;
}
export default function LidarStatusItem({lidarItem, statusMetadata}: LidarStatusItemProp_t) {

    const {lidar_id, site_id, corner, street, cross_street} = lidarItem
    const {isPending: stausMetadataPending, error: errorStatusMetadata, data: liveStatusMetadata} = useStatus(lidar_id, site_id)
    const [receivedTime, setReceivedTime] = useState<string>(new Date(Date.now()).toLocaleString('en-US'))
    const navigate = useNavigate();

    useEffect(() => {
        setReceivedTime(new Date(Date.now()).toLocaleString('en-US'))
    }, [errorStatusMetadata]);

    return (
        <div className='bg-white drop-shadow-md p-3 rounded-md flex flex-col gap-3'>
            <div className='flex flex-row gap-2 '>
                <Tag onClick={() => navigate(`/lidar/${lidar_id}`)} label="LIDAR ID" value={String(lidar_id)} />
                <p className='font-semibold line-clamp-1'>
                    {street} &#x2022; {cross_street}
                </p>
                <Tag className='ml-auto' label="CORNER" value={corner} />
            </div>
            <StorageStatus storageInformation={stausMetadataPending ? statusMetadata.edgeStorageStatus : liveStatusMetadata?.edgeStorageStatus} />
            <ServiceStatus service="ros" />
            <ServiceStatus service="pcap" />
            <p className='text-neutral-400 italic text-sm'>
                Last updated at {receivedTime}.
            </p>
        </div>
    )

}