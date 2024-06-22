import {ViewShell} from "../../components/ViewShell.tsx";
import {PaneGroup} from "../../components/PaneGroup.tsx";
import {PaneSection} from "../../components/PaneSection.tsx";
import {Pane} from "../../components/Pane.tsx";
import useDatabaseMetadataList from "../../hooks/useDatabaseMetadataList.tsx";
import {useState} from "react";
import {Pagination} from "../../components/Pagination.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import {DatabaseMetadata_t} from "../../types.tsx";
import {DatabaseItem} from "../../components/DatabaseItem.tsx";

export default function ExplorerRoot() {

    const [page, setPage] = useState<number>(1);
    const {isPending: databaseMetadataListPending, error: databaseMetadataListError, data: databaseMetadataList} = useDatabaseMetadataList(page)

    if (databaseMetadataListPending) return <LoadingSpinner />
    if (databaseMetadataListError) return <ErrorMessage error={databaseMetadataListError}/>

    const databaseMetadataItems = databaseMetadataList!.items.map((databaseMetadataItem: DatabaseMetadata_t) => {
        return <DatabaseItem key={`${databaseMetadataItem.lidar_id}:${databaseMetadataItem.filename}:${databaseMetadataItem.file_size}`} {...databaseMetadataItem} />
    })

    return (
        <ViewShell>
            <PaneGroup>
                <Pane minimalWidth>
                    <PaneSection label="Query Captured Recordings" description="Query previosuly captured recordings through a set of filters.">
                        <div>
                            Testing
                        </div>
                    </PaneSection>
                    <PaneSection label="Download Selected Capture Recordings" description="Save selected capture recordings to be downloaded as one zip package.">
                        <div>

                        </div>
                    </PaneSection>
                </Pane>
                <Pane stretch>
                    <PaneSection>
                        <div className='flex flex-col items-center w-full'>
                            <div>
                                <Pagination selectionWindowSize={3} currentPage={page} setPage={setPage} firstPageIndex={1}
                                            lastPageIndex={databaseMetadataList!.pages} totalItemCount={databaseMetadataList!.total}
                                            pageSize={databaseMetadataList!.size} />
                            </div>
                            <div className='flex flex-col gap-4'>
                                {databaseMetadataItems}
                            </div>
                        </div>
                    </PaneSection>
                </Pane>
            </PaneGroup>
        </ViewShell>
    )

}