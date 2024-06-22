import {ViewShell} from "../../components/ViewShell.tsx";
import {PaneGroup} from "../../components/PaneGroup.tsx";
import {PaneSection} from "../../components/PaneSection.tsx";
import {Pane} from "../../components/Pane.tsx";
import useFileMetadataList from "../../hooks/useFileMetadataList.tsx";
import {useState} from "react";
import {Pagination} from "../../components/Pagination.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";

export default function ExplorerRoot() {

    const [page, setPage] = useState<number>(1);
    const {isPending: fileMetadataListPending, error: fileMetadataListError, data: fileMetadataList} = useFileMetadataList(page)


    if (fileMetadataListPending) return <LoadingSpinner />
    if (fileMetadataListError) return <ErrorMessage error={fileMetadataListError}/>

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
                        <div className='flex flex-col items-center'>
                                <Pagination selectionWindowSize={3} currentPage={page} setPage={setPage} firstPageIndex={1} lastPageIndex={fileMetadataList!.pages} totalItemCount={fileMetadataList!.total} pageSize={fileMetadataList!.size} />
                        </div>
                    </PaneSection>
                </Pane>
            </PaneGroup>
        </ViewShell>
    )

}