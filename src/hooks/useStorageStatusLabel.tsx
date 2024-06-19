import {StorageInformation_t, StorageStatusLabel_t} from "../types.tsx";
import {useMemo} from "react";

export default function useStorageStatusLabel(props: StorageInformation_t | undefined): StorageStatusLabel_t {

    return useMemo<StorageStatusLabel_t>(
        () => {

            if (props?.totalSpace === undefined || props?.usedSpace === undefined) return "error"

            const usagePercentage = ((props.usedSpace / props.totalSpace)*100).toFixed(0)

            if (Number(usagePercentage) > 80) {
                return "unstable"
            } else if (Number(usagePercentage) > 60) {
                return "critical"
            } else {
                return "stable"
            }
        },
        [props?.totalSpace, props?.usedSpace]
    );

}