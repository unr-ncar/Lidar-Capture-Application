import {LidarMetadata_t} from "../types.tsx";

export default function(lidarMetadataList: Array<LidarMetadata_t>): Array<number> {
    const siteIds = lidarMetadataList.map((site: LidarMetadata_t) => {
        return site.site_id
    })
    return [...new Set(siteIds)]
}