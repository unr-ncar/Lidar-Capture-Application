import {ViewShell} from "../../components/ViewShell.tsx";
import {PaneGroup} from "../../components/PaneGroup.tsx";
import {PaneSection} from "../../components/PaneSection.tsx";
import {Pane} from "../../components/Pane.tsx";
import useDatabaseMetadataList from "../../hooks/useDatabaseMetadataList.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {Pagination} from "../../components/Pagination.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import {DatabaseMetadata_t} from "../../types.tsx";
import {DatabaseItem} from "../../components/DatabaseItem.tsx";
import {FormGroup} from "../../components/forms/FormGroup.tsx";
import {DatePickerForm} from "../../components/forms/DatePickerForm.tsx";
import {TimePickerForm} from "../../components/forms/TimePickerForm.tsx";
import {TextForm} from "../../components/forms/TextForm.tsx";
import {CardinalDirectionsSelectForm} from "../../components/forms/CardinalDirectionsSelectForm.tsx";

interface DatabaseItemQueryState_t {
    date: string; // Input - Date - P
    time: string; // Input - Time - P
    lidar_id: string; // Input - Number - NP
    site_id: string; // Input - Number - NP
    deployment_id: string; // Input - Number - NP
    city: string; // Combobox - String - NP
    state: string; // Combobox - String - NP
    street: string; // Combobox - String - NP
    cross_street: string; // Combobox - String - NP
    corner: string; // Select - String - NP
}

export default function ExplorerRoot() {

    const [query, setQuery] = useState<DatabaseItemQueryState_t>({
        date: '',
        time: '',
        lidar_id: '',
        site_id: '',
        deployment_id: '',
        state: '',
        city: '',
        street: '',
        cross_street: '',
        corner: ''
    });
    const [page, setPage] = useState<number>(3);
    const {
        isPending: databaseMetadataListPending,
        error: databaseMetadataListError,
        data: databaseMetadataList
    } = useDatabaseMetadataList(null, page, 20)

    const handleQueryForm = (value: string, key: keyof DatabaseItemQueryState_t) => {
        setQuery((prevState) => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    useEffect(() => {
        console.log(query)
    }, [query]);

    const databaseMetadataItems = databaseMetadataList?.items.map((databaseMetadataItem: DatabaseMetadata_t) => {
        return <DatabaseItem
            {...databaseMetadataItem}
            key={databaseMetadataItem._id}
        />
    })

    return (
        <ViewShell>
            <PaneGroup>
                <Pane minimalWidth>
                    <PaneSection label="Query Captured Recordings"
                                 description="Query previosuly captured recordings through a set of filters.">
                        <FormGroup label="Query Paramters">
                            <DatePickerForm value={query.date} setter={(event: ChangeEvent<HTMLInputElement>) => handleQueryForm(event.target.value, "date")} label='Capture Date'/>
                            <TimePickerForm value={query.time} setter={(event: ChangeEvent<HTMLInputElement>) => handleQueryForm(event.target.value, "time")} label='Capture Time'/>
                            <TextForm label="Site ID" value={query.site_id}  setter={(event: ChangeEvent<HTMLInputElement>) => handleQueryForm(event.target.value, "site_id")} type="number" />
                            <TextForm label="Sensor ID" value={query.lidar_id} setter={(event: ChangeEvent<HTMLInputElement>) => handleQueryForm(event.target.value, "lidar_id")} type="number" />
                            <TextForm label="Deployment ID" value={query.deployment_id} setter={(event: ChangeEvent<HTMLInputElement>) => handleQueryForm(event.target.value, "deployment_id")} type="number" />
                        </FormGroup>
                    </PaneSection>
                </Pane>
                <Pane stretch>
                    <PaneSection fillHeight>
                        <div className='flex flex-col gap-4 md:justify-between md:h-full'>
                            { databaseMetadataListPending && <LoadingSpinner/> }
                            { databaseMetadataListError && <ErrorMessage error={databaseMetadataListError}/> }
                            { databaseMetadataItems && !databaseMetadataListError && !databaseMetadataListPending && (
                                <>
                                    <div className='flex flex-col md:grid md:grid-cols-2 gap-3'>
                                        {databaseMetadataItems}
                                    </div>
                                    <Pagination selectionWindowSize={3} currentPage={page} setPage={setPage}
                                                firstPageIndex={1}
                                                lastPageIndex={databaseMetadataList!.pages}
                                                totalItemCount={databaseMetadataList!.total}
                                                pageSize={databaseMetadataList!.size}/>
                                </>
                            )}
                        </div>
                    </PaneSection>
                </Pane>
            </PaneGroup>
        </ViewShell>
    )

}