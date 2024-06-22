import {DatabaseMetadata_t} from "../types.tsx";
import {Tag} from "./Tag.tsx";

export interface DatabaseItemProps_t {
}
export function DatabaseItem(props: DatabaseMetadata_t) {

    const {lidar_id, site_id, filename, file_size, } = props;

    return (
        <div className='bg-neutral-100 px-4 py-3 flex flex-col gap-2 rounded-md'>
            <p className='text-sm font-medium line-clamp-2 break-all'>
                {filename}
            </p>
            <div className='flex flex-row gap-2'>
                <Tag label="SITE ID" value={lidar_id} />
                <Tag label="LIDAR ID" value={site_id} />
                <Tag label="FILE SIZE" value={file_size} />
            </div>
        </div>
    )
}