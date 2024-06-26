import {ViewShell} from "../../components/ViewShell.tsx";
import {PaneGroup} from "../../components/PaneGroup.tsx";
import {PaneSection} from "../../components/PaneSection.tsx";
import {Pane} from "../../components/Pane.tsx";
import useDatabaseMetadataList from "../../hooks/useDatabaseMetadataList.tsx";
import {useEffect, useState} from "react";
import {Pagination} from "../../components/Pagination.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import {DatabaseMetadata_t, DatabaseSelection_t} from "../../types.tsx";
import {DatabaseItem} from "../../components/DatabaseItem.tsx";
import ItemList from "../../components/ItemList.tsx";
import {useDatabaseSelections} from "../../hooks/useDatabaseSelections.tsx";
import {DownloadItem} from "../../components/DownloadItem.tsx";

export default function ExplorerRoot() {

    const [page, setPage] = useState<number>(3);
    const {databaseSelections, saveSelection, removeSelection, isSelected, isSaved, toggleSelection, clearSelections} = useDatabaseSelections()
    const {
        isPending: databaseMetadataListPending,
        error: databaseMetadataListError,
        data: databaseMetadataList
    } = useDatabaseMetadataList(page, 20)

    useEffect(() => {
        console.log(databaseSelections)
    }, [databaseSelections]);

    if (databaseMetadataListPending) return <LoadingSpinner/>
    if (databaseMetadataListError) return <ErrorMessage error={databaseMetadataListError}/>

    const databaseMetadataItems = databaseMetadataList!.items.map((databaseMetadataItem: DatabaseMetadata_t) => {
        return <DatabaseItem
            key = {databaseMetadataItem._id}
            isSelected={() => isSelected(databaseMetadataItem._id)}
            isSaved={() => isSaved(databaseMetadataItem._id)}
            toggleSelectionFunction={() => toggleSelection(databaseMetadataItem._id)}
            removeSelectionFunction={() => removeSelection(databaseMetadataItem._id)}
            saveSelectionFunction={() => saveSelection(databaseMetadataItem)}
            item={databaseMetadataItem}
        />
    })

    const downloadItems = databaseSelections.map((databaseSelection: DatabaseSelection_t) => {
        return <DownloadItem
            key={databaseSelection.item._id}
            item={databaseSelection}
            isSelected={() => isSelected(databaseSelection.item._id)}
            isSaved={() => isSaved(databaseSelection.item._id)}
            toggleSelectionFunction={() => toggleSelection(databaseSelection.item._id)}
            removeSelectionFunction={() => removeSelection(databaseSelection.item._id)} />
    })

    return (
        <ViewShell>
            <PaneGroup>
                <Pane minimalWidth>
                    <PaneSection label="Query Captured Recordings"
                                 description="Query previosuly captured recordings through a set of filters.">
                        <div>
                            Testing
                        </div>
                    </PaneSection>
                    <PaneSection label="Download Saved Capture Recordings"
                                 description="Download saved capture recordings into one downloadable zip package.">
                        <div>
                            <ItemList>
                                {downloadItems}
                            </ItemList>
                        </div>
                    </PaneSection>
                </Pane>
                <Pane stretch>
                    <PaneSection fillHeight>
                        <div className='flex flex-col gap-4 md:justify-between md:h-full'>
                            <ItemList>
                                {databaseMetadataItems}
                            </ItemList>
                                <Pagination selectionWindowSize={3} currentPage={page} setPage={setPage}
                                            firstPageIndex={1}
                                            lastPageIndex={databaseMetadataList!.pages}
                                            totalItemCount={databaseMetadataList!.total}
                                            pageSize={databaseMetadataList!.size}/>
                        </div>
                    </PaneSection>
                </Pane>
            </PaneGroup>
        </ViewShell>
    )

}