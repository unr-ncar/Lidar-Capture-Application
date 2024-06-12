import {LidarMetadata_t, LidarSelection_t} from "../types.tsx";
import {create, StoreApi, UseBoundStore} from "zustand";

interface useSensorSelectionsState_t {
    pcapSelections: Array<LidarSelection_t>;
    rosSelections: Array<LidarSelection_t>;
    createSelections: (items: Array<LidarMetadata_t>) => void;
    resetSelections: () => void;
    clearSelections: () => void;
    //toggleSelection: (selection: LidarSelection_t, format: RecordingFormat) => void;
}

const useSensorSelections: UseBoundStore<StoreApi<useSensorSelectionsState_t>> = create<useSensorSelectionsState_t>()((set) => ({
    sensors: [],
    pcapSelections: [],
    rosSelections: [],
    createSelections: (items: Array<LidarMetadata_t>) => set((state) => ({
        pcapSelections: items.map((item: LidarMetadata_t) => {
            const existingItem = state.pcapSelections.find((existingItem: LidarSelection_t) => existingItem.item.lidar_id === item.lidar_id)

            if (existingItem) return existingItem

            return {
                item: item,
                format: 'pcap',
                selected: false
            } as LidarSelection_t
        })
    })),
    resetSelections: (() => set(() => ({

    }))),
    clearSelections: (() => set(() => ({

    }))),

}))
export default useSensorSelections;