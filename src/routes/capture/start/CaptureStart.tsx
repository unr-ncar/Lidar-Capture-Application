import useLidarMetadata, {LidarMetadataItem_t} from "../../../hooks/useLidarMetadata.tsx";
import {useEffect, useState} from "react";
import LidarSelectionItem from "../../../components/LidarSelectionItem.tsx";
import { QueryStatus, UseMutateFunction} from "@tanstack/react-query";

export type Operation_t = 'start' | 'stop';
export type CaptureFormat_t = 'pcap' | 'ros';
export interface LidarSelectionItem_t {
    lidar: LidarMetadataItem_t;
    selected: boolean;
    mutateFunction?: UseMutateFunction;
    status?: {
        isPending: boolean;
        error: Error | null;
        data: {
            success: boolean;
            message: string
        };
        status: QueryStatus;
    }
}
export default function CaptureStart() {

    const [lidarSelectionItems, setLidarSelectionItems] = useState<Array<LidarSelectionItem_t>>([])
    const [captureFormat] = useState<CaptureFormat_t>('pcap')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const {isPending, data, error} = useLidarMetadata(currentPage)

    useEffect(() => {
        const selections = data?.items.map((lidarMetadataItem: LidarMetadataItem_t) => {
            return {
                lidar: lidarMetadataItem,
                captureFormat: captureFormat,
                selected: false
            }
        }) || []
        setLidarSelectionItems(selections)
    }, [captureFormat, data?.items, setLidarSelectionItems])

    if (isPending) return <p>Loading...</p>
    if (error) return <p>Error...</p>

    const handleStartCapture = () => {
        lidarSelectionItems.forEach((lidar: LidarSelectionItem_t) => {
            if (lidar.selected) lidar.mutateFunction && lidar.mutateFunction()
        })
    }

    return (
        <div>
            <div>
                {lidarSelectionItems.map((lidarSelectionItem: LidarSelectionItem_t) => {
                    return <LidarSelectionItem operation='start' format={captureFormat} lidarSelectionItemsState={{state: lidarSelectionItems, setter: setLidarSelectionItems}}  key={lidarSelectionItem.lidar.lidar_id} selectionItem={lidarSelectionItem}  />
                })}
            </div>
            <button onClick={() => setCurrentPage(1)}>
                Page 1
            </button>
            <button onClick={() => setCurrentPage(2)}>
                Page 2
            </button>
            <button onClick={handleStartCapture}>
                Start Capture
            </button>
        </div>
    )
}
