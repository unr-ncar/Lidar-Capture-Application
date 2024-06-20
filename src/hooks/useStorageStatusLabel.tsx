import {StorageInformation_t, StorageStatusLabel_t} from "../types.tsx";
import {useCallback} from "react";

export default function useStorageStatusLabel(props: StorageInformation_t | undefined): StorageStatusLabel_t {

    const getStatusLabel = useCallback(() => {
        if (props?.usedSpace === undefined || props?.totalSpace === undefined) return "error";

        const usagePercentage = ((props.usedSpace / props.totalSpace) * 100).toFixed(0);

        if (Number(usagePercentage) > 80) {
            return "unstable";
        } else if (Number(usagePercentage) > 60) {
            return "critical";
        } else {
            return "stable";
        }
    }, [props]);

    return getStatusLabel();
}