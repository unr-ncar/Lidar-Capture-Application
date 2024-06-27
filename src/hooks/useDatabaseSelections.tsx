//import {DatabaseMetadata_t, DatabaseSelection_t} from "../types.tsx";
//import {useState} from "react";

/* June 27th, 2024: Removed usage of this component due to browser restrictions of contacting self-signed
                    certificates and downloading programmatically. Possibly can be reimplemented in a future
                    version of this application by reimplementing as a Node process using Electron.
 */

/*
export interface useDatabaseSelections_t {
    databaseSelections: Array<DatabaseSelection_t>;
    clearSelections: () => void;
    saveSelection: (databaseItem: DatabaseMetadata_t) => void;
    removeSelection: (databaseItemId: string) => boolean;
    toggleSelection: (selectionLidarId: string) => void;
    isSelected: (databaseItemId: string) => boolean;
    isSaved: (databaseItemId: string) => boolean;
}

export function useDatabaseSelections(): useDatabaseSelections_t {
    const [selections, setSelections] = useState<Array<DatabaseSelection_t>>([])

    const clearSelections = () => {
        setSelections([])
    }

    const saveSelection = (databaseItem: DatabaseMetadata_t) => {
        setSelections((prevState: Array<DatabaseSelection_t>) => {
            return [...prevState, {
                item: databaseItem,
                selected: false
            }]
        })
    }

    const removeSelection = (databaseItemId: string) => {

        let removalSuccessful = false

        setSelections((prevState: Array<DatabaseSelection_t>) => {
            if (prevState.some((selection: DatabaseSelection_t) => selection.item._id === databaseItemId)) {
                removalSuccessful = true
                return [...prevState.filter((item: DatabaseSelection_t) => {
                    if (item.item._id !== databaseItemId) return item
                })]
            } else {
                return prevState
            }
        })

        return removalSuccessful
    }

    const toggleSelection = (databaseItemId: string) => {
        setSelections((prevState: Array<DatabaseSelection_t>) => {
            if (prevState.some((selection: DatabaseSelection_t) => selection.item._id === databaseItemId)) {
                return [...prevState.filter((item: DatabaseSelection_t) => {
                    if (item.item._id === databaseItemId) return {
                        ...item,
                        selected: !item.selected
                    }
                })]
            } else {
                return prevState
            }
        })
    }

    const isSelected = (databaseItemId: string) => {
        return selections.find((selectionItem: DatabaseSelection_t) => selectionItem.item._id === databaseItemId)!.selected
    }

    const isSaved = (databaseItemId: string) => {
        return selections.some((selectionItem: DatabaseSelection_t) => selectionItem.item._id === databaseItemId)
    }

    return {
        databaseSelections: selections,
        clearSelections: clearSelections,
        saveSelection: saveSelection,
        removeSelection: removeSelection,
        toggleSelection: toggleSelection,
        isSelected: isSelected,
        isSaved: isSaved
    }

}
*/