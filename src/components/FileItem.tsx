import {FileMetadata_t} from "../types.tsx";
import {DocumentArrowUpIcon} from "@heroicons/react/20/solid";
import {useMemo} from "react";

export default function FileItem({fileName, fileSize, creationTime, lastModified}: FileMetadata_t) {

    const {createdTimestamp, lastModifiedTimestamp} = useMemo(() => {

        const createdAtTimestamp = new Date(creationTime * 100).toLocaleString()
        const lastModifiedAtTimestamp = new Date(lastModified * 100).toLocaleString()

        return {
            createdTimestamp: createdAtTimestamp,
            lastModifiedTimestamp: lastModifiedAtTimestamp,
        }
    }, [creationTime, lastModified])

    return (
        <div>
            <div>
                <span>
                    <DocumentArrowUpIcon className='size-4' />
                </span>
                <div>
                    <p>
                        {fileName}
                    </p>
                    <p>
                        {fileSize}
                    </p>
                </div>
            </div>
            <div>
                <p>
                    Created at {createdTimestamp}
                </p>
                <p>
                    Last Modified at {lastModifiedTimestamp}
                </p>
            </div>
        </div>
    )
}