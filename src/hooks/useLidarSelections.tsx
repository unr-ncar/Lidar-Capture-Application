import {LidarMetadata_t, LidarSelection_t, RecordingFormat, RecordingOperation} from "../types.tsx";
import {create, StoreApi, UseBoundStore} from "zustand";

interface LidarSelectionsState_t {
    selections: Array<LidarSelection_t>;
    setSelections: (items: Array<LidarMetadata_t>, operation: RecordingOperation, format: RecordingFormat) => void;
    resetToggleSelections: () => void;
    toggleSelection: (selectionLidarId: number) => void;
    updateOperation: (operation: RecordingOperation) => void;
    updateFormat: (format: RecordingFormat) => void;
}

const useLidarSelections: UseBoundStore<StoreApi<LidarSelectionsState_t>> = create<LidarSelectionsState_t>()((set) => ({
    selections: [],
    setSelections: (items: Array<LidarMetadata_t>, operation: RecordingOperation, format: RecordingFormat) => set(() => ({
        selections: items.map((item: LidarMetadata_t) => {
            return {
                format: format,
                item: item,
                operation: operation,
                selected: false
            }
        })
    })),
    resetToggleSelections: () => set(() => ({
        selections: []
    })),
    toggleSelection: (selectionId: number) => set((state) => ({
        selections: state.selections.map((selection: LidarSelection_t) => {
            if (selection.item.lidar_id !== selectionId) return selection
            return {
                format: selection.format,
                item: selection.item,
                selected: !selection.selected
            }
        })
    })),
    updateOperation: (operation: RecordingOperation) => set((state: LidarSelectionsState_t) => ({
        selections: state.selections.map((selection: LidarSelection_t) => {
            return {
                ...selection,
                operation: operation
            }
        })
    })),
    updateFormat: (format: RecordingFormat) => set((state: LidarSelectionsState_t) => ({
        selections: state.selections.map((selection: LidarSelection_t) => {
            return {
                ...selection,
                format: format
            }
        })
    }))
}))
export default useLidarSelections;