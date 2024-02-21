import useLidarMetadata, {LidarMetadataItem_t} from "../../../hooks/useLidarMetadata.tsx";
import {useEffect, useState} from "react";
import LidarSelectionItem from "../../../components/LidarSelectionItem.tsx";
import { QueryStatus, UseMutateFunction} from "@tanstack/react-query";

type CaptureFormat_t = 'pcap' | 'ros';
export interface LidarSelectionItem_t {
    lidar: LidarMetadataItem_t;
    captureFormat: CaptureFormat_t;
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

    const handleToggle = (selectedItem: LidarMetadataItem_t) => {
        setLidarSelectionItems((prevState: Array<LidarSelectionItem_t>) => {
            return prevState.map((lidarSelectionItem: LidarSelectionItem_t) => {
                if (lidarSelectionItem.lidar.lidar_id === selectedItem.lidar_id) {
                    return {
                        ...lidarSelectionItem,
                        selected: !lidarSelectionItem.selected
                    }
                }
                return lidarSelectionItem
            })
        })
    }

    const attachMutationFunction = (lidarSelection: LidarMetadataItem_t, mutationFunction: () => void) => {
        setLidarSelectionItems((prevState: Array<LidarSelectionItem_t>) => {
            return prevState.map((lidarSelectionItem: LidarSelectionItem_t) => {
                if (lidarSelectionItem.lidar.lidar_id === lidarSelection.lidar_id) {

                    return {
                        ...lidarSelectionItem,
                        mutateFunction: mutationFunction
                    }
                }
                return lidarSelectionItem
            })
        })
    }

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
                    return <LidarSelectionItem stateSetter={setLidarSelectionItems}  key={lidarSelectionItem.lidar.lidar_id} selected={lidarSelectionItem.selected} lidar={lidarSelectionItem.lidar} onChangeHandler={() => handleToggle(lidarSelectionItem.lidar)}  />
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
