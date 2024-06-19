import {LidarMetadata_t, LidarSelection_t, RecordingFormat} from "../types.tsx";
import {create, StoreApi, UseBoundStore} from "zustand";

interface useSensorSelectionsState_t {
    selections: Array<LidarSelection_t>;
    createSelections: (items: Array<LidarMetadata_t>) => void;
    clearSelections: () => void;
    toggleSelection: (selectionLidarId: number, format: RecordingFormat) => void;
    isSelected: (selectionLidarId: number, format: RecordingFormat) => boolean;
}

const useSensorSelections: UseBoundStore<StoreApi<useSensorSelectionsState_t>> = create<useSensorSelectionsState_t>()((set, get) => ({
    selections: [],
    createSelections: (items: Array<LidarMetadata_t>) => set((state) => ({
        selections: [
            ...items
                .filter(item => !state.selections.some(existingItem => existingItem.item.lidar_id === item.lidar_id))
                .map((newItem: LidarMetadata_t) => ({
                    item: newItem,
                    selectedFormats: [],
                } as LidarSelection_t)),
            ...state.selections
        ],
    })),
    clearSelections: (() => set((state) => ({
        selections: [
            ...state.selections.map((selection) => {
                return {
                    ...selection,
                    selectedFormats: []
                }
            })
        ]
    }))),
    toggleSelection: ((selectionLidarId: number, format: RecordingFormat) => set((state) => ({
        selections: [...state.selections.map((selection) => {
            if (selectionLidarId === selection.item.lidar_id) {
                if (!selection.selectedFormats.some(selectionFormat => selectionFormat === format)) {
                    return {
                        ...selection,
                        selectedFormats: [...selection.selectedFormats, format]
                    }
                } else {
                    return {
                        ...selection,
                        selectedFormats: [...selection.selectedFormats.filter(format => format !== format)]
                    }
                }
            }
            return selection
        })],
    }))),
    isSelected: (selectionLidarId, format) => get().selections.find((selectionItem: LidarSelection_t) => selectionItem.item.lidar_id === selectionLidarId)!.selectedFormats.some(selectionFormat => selectionFormat === format),
}))
export default useSensorSelections;