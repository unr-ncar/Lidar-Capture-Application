import { StorageStatusLabel_t} from "../types.tsx";
import {useMemo} from "react";

export interface useStorageStatusLabelProps_t {
    totalSpace: number | undefined;
    usedSpace: number | undefined;
}
export default function useStorageStatusLabel(props: useStorageStatusLabelProps_t): StorageStatusLabel_t {

    const {totalSpace, usedSpace} = props;

    return useMemo<StorageStatusLabel_t>(
        () => {

            if (totalSpace === undefined || usedSpace === undefined) return "error"

            const usagePercentage = ((usedSpace / totalSpace)*100).toFixed(0)

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