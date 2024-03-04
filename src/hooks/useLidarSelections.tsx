import {LidarMetadata_t, LidarSelection_t, RecordingFormat, RecordingOperation} from "../types.tsx";
import {UseMutateFunction} from "@tanstack/react-query";
import {create} from "zustand";

interface LidarSelectionsState_t {
    selections: Array<LidarSelection_t>;
    setSelections: (items: Array<LidarMetadata_t>, operation: RecordingOperation, format: RecordingFormat) => void;
    resetToggleSelections: () => void;
    toggleSelection: (selectionId: number) => void;
    updateOperation: (operation: RecordingOperation) => void;
    updateFormat: (format: RecordingFormat) => void;
    initializeMutationFunction: (mutation: UseMutateFunction) => void;
}

export default function useLidarSelections() {
    return create<LidarSelectionsState_t>()((set) => ({
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
            selections: state.selections.filter((selection: LidarSelection_t) => {
                if (selection.item.lidar_id !== selectionId) return selection
                return {
                    format: selection.format,
                    item: selection.item,
                    operation: selection.operation,
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
        })),
        initializeMutationFunction: (mutation: UseMutateFunction) => set((state: LidarSelectionsState_t) => ({
            selections: state.selections.map((selection: LidarSelection_t) => {
                return {
                    ...selection,
                    mutate: mutation
                }
            })
        }))
    }))
 }