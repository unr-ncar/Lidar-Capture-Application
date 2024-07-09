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
import {FormGroup} from "../../components/forms/FormGroup.tsx";
import {DatePickerForm} from "../../components/forms/DatePickerForm.tsx";
import {TimePickerForm} from "../../components/forms/TimePickerForm.tsx";
import {Button} from "../../components/Button.tsx";
import {useDatabaseMetadataQuery} from "../../hooks/useDatabaseMetadataQuery.tsx";

interface DatabaseItemQueryState_t {
    date: Date; // Input - Date - P
    time: Date; // Input - Time - P
    lidar_id: number; // Input - Number - NP
    site_id: number; // Input - Number - NP
    deployment_id: number; // Input - Number - NP
    city: string; // Combobox - String - NP
    state: string; // Combobox - String - NP
    street: string; // Combobox - String - NP
    cross_street: string; // Combobox - String - NP
    corner: string; // Select - String - NP
}
export default function ExplorerRoot() {

    const [query, setQuery] = useState<DatabaseItemQueryState_t>();
    const [page, setPage] = useState<number>(3);
    const {
        isPending: databaseMetadataQueryListPending,
        error: databaseMetadataQueryListError,
        data: databaseMetadataQueryList
    } = useDatabaseMetadataQuery(null, page, 20)
    const {
        isPending: databaseMetadataListPending,
        error: databaseMetadataListError,
        data: databaseMetadataList
    } = useDatabaseMetadataList(page, 20)

    if (databaseMetadataListPending) return <LoadingSpinner/>
    if (databaseMetadataListError) return <ErrorMessage error={databaseMetadataListError}/>

    const databaseMetadataItems = databaseMetadataList!.items.map((databaseMetadataItem: DatabaseMetadata_t) => {
        return <DatabaseItem
            {...databaseMetadataItem}
            key = {databaseMetadataItem._id}
        />
    })

    return (
        <ViewShell>
            <PaneGroup>
                <Pane minimalWidth>
                    <PaneSection label="Query Captured Recordings"
                                 description="Query previosuly captured recordings through a set of filters.">
                        <FormGroup label="Query Paramters">
                            <DatePickerForm label='Capture Date' />
                            <TimePickerForm label='Capture Time' />
                        </FormGroup>
                    </PaneSection>
                </Pane>
                <Pane stretch>
                    <PaneSection fillHeight>
                        <div className='flex flex-col gap-4 md:justify-between md:h-full'>
                            <div className='flex flex-col md:grid md:grid-cols-2 gap-3'>
                                {databaseMetadataItems}
                            </div>
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