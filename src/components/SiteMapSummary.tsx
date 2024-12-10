import useLidarMetadata from "../hooks/backend/metadataService/useLidarMetadata"
import useRecordingStatus from "../hooks/backend/graphqlService/useRecordingStatus";
import { useCallback } from "react";

export default function SiteMapSummary(siteId: number) {

    const {
        isPending,
        data,
        isPending
    } = useLidarMetadata(1, 4, { site_id: siteId });

    const lidarIds = useCallback(() => {
        return data.items.map((item) => item.lidar_id);
    })

    const useRecordingStatus()

    return (
        <div>

        </div>
    )
}