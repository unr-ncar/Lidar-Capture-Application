import { StorageInformation_t, StorageStatusLabel_t} from "../types.tsx";
import {useMemo} from "react";

export default function useStorageStatusLabel({totalSpace, usedSpace}: StorageInformation_t): StorageStatusLabel_t {

    return useMemo<StorageStatusLabel_t>(
        () => {

            const usagePercentage = ((usedSpace / totalSpace)*100).toFixed(0)

            if (totalSpace === undefined || usedSpace === undefined) return "error"

            if (Number(usagePercentage) > 80) {
                return "unstable"
            } else if (Number(usagePercentage) > 60) {
                return "critical"
            } else {
                return "stable"
            }
        },
        [usedSpace, totalSpace]
    );

}