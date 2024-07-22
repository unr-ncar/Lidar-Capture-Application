import {FileMetadata_t} from "../types.tsx";
import {useMemo} from "react";
import {Tag} from "./Tag.tsx";
import {SignalIcon, DocumentIcon} from "@heroicons/react/16/solid";

export interface FileItemProps_t extends FileMetadata_t {
    lidarId: number;
}

export default function FileItem({fileName, fileSize, creationTime, lastModified, lidarId}: FileItemProps_t) {

    const humanFileSize = `${(Number(fileSize) / Math.pow(1024, 3)).toFixed(2)} GB`
    const {createdTimestamp} = useMemo(() => {

        const createdAtTimestamp = new Date(creationTime * 1000).toLocaleString()
        const lastModifiedAtTimestamp = new Date(lastModified * 1000).toLocaleString()

        return {
            createdTimestamp: createdAtTimestamp,
            lastModifiedTimestamp: lastModifiedAtTimestamp,
        }
    }, [creationTime, lastModified])


    return (
        <div className="flex flex-col gap-2 bg-neutral-100 p-4 rounded">
            <div className="flex flex-col gap-2">
                <p className='font-medium break-all'>
                    {fileName}
                </p>
                <div className='flex flex-row gap-2 flex-wrap'>
                    <Tag icon={<SignalIcon/>} label="LIDAR ID" value={String(lidarId)}/>
                    <Tag icon={<DocumentIcon/>} label="FILE SIZE" value={String(humanFileSize)}/>
                </div>
            </div>
            <p className='text-sm text-neutral-400 font-medium'>
                Created at {createdTimestamp}
            </p>
        </div>
    )
}