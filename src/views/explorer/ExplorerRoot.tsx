import {ViewShell} from "../../components/ViewShell.tsx";
import {PaneGroup} from "../../components/PaneGroup.tsx";
import {PaneSection} from "../../components/PaneSection.tsx";
import {Pane} from "../../components/Pane.tsx";
import useDatabaseMetadataList from "../../hooks/useDatabaseMetadataList.tsx";
import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {Pagination} from "../../components/Pagination.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import {DatabaseMetadata_t, LidarMetadata_t} from "../../types.tsx";
import {DatabaseItem} from "../../components/DatabaseItem.tsx";
import {FormGroup} from "../../components/forms/FormGroup.tsx";
import {DatePickerForm} from "../../components/forms/DatePickerForm.tsx";
import {TimePickerForm} from "../../components/forms/TimePickerForm.tsx";
import {TextForm} from "../../components/forms/TextForm.tsx";
import {CardinalDirectionsSelectForm} from "../../components/forms/CardinalDirectionsSelectForm.tsx";
import {ComboboxForm} from "../../components/forms/ComboboxForm.tsx";
import useLidarMetadataList from "../../hooks/useLidarMetadataList.tsx";
import Button from "../../components/Button.tsx";
import {FunnelIcon, XMarkIcon} from "@heroicons/react/20/solid";

interface DatabaseItemQueryState_t {
    date: string; // Input - Date - P - D
    time: string; // Input - Time - P - D
    lidar_id: string; // Input - Number - NP - D
    site_id: string; // Input - Number - NP - D
    deployment_id: string; // Input - Number - NP - D
    city: string | null; // Combobox - String - NP
    state: string | null; // Combobox - String - NP
    street: string | null; // Combobox - String - NP
    cross_street: string | null; // Combobox - String - NP
    corner: string; // Select - String - NP - D
}

export default function ExplorerRoot() {

    const [query, setQuery] = useState<DatabaseItemQueryState_t>({
        date: '',
        time: '',
        lidar_id: '',
        site_id: '',
        deployment_id: '',
        state: null,
        city: null,
        street: null,
        cross_street: null,
        corner: ''
    });
    const [page, setPage] = useState<number>(3);
    const {
        isPending: lidarMetadataListPending,
        data: lidarMetadataList
    } = useLidarMetadataList(1, 20)

    const geographicSelections: {
        cities: Array<string>,
        states: Array<string>,
        streets: Array<string>,
        cross_streets: Array<string>
    } = useMemo(() => {
        if (!lidarMetadataList?.items) return {
            cities: [],
            states: [],
            streets: [],
            cross_streets: []
        }

        const cities: Array<string> = []
        const states: Array<string> = []
        const streets: Array<string> = []
        const cross_streets: Array<string> = []

        lidarMetadataList.items.map((metadata: LidarMetadata_t) => {
            cities.push(metadata.city)
            states.push(metadata.state)
            streets.push(metadata.street)
            cross_streets.push(metadata.cross_street)
        })

        return {
            cities: [...new Set(cities)],
            states: [...new Set(states)],
            // Fix for empty street in MangoDB Database.
            streets: [...new Set(streets)].filter((street) => street !== ''),
            cross_streets: [...new Set(cross_streets)]
        }

    }, [lidarMetadataList])

    const {
        isPending: databaseMetadataListPending,
        error: databaseMetadataListError,
        data: databaseMetadataList
    } = useDatabaseMetadataList(null, page, 20)

    useEffect(() => {
        console.log(geographicSelections)
    }, [geographicSelections]);

    const handleTextForm = (value: string, key: keyof DatabaseItemQueryState_t) => {
        setQuery((prevState) => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    const filteredGeographicLocations = (queryState: string, searchKey: keyof {
        cities: Array<string>,
        states: Array<string>,
        streets: Array<string>,
        cross_streets: Array<string>
    }) => {
        return geographicSelections[searchKey].filter((item: string) => {
            return item.toLowerCase().includes(queryState.toLowerCase())
        })
    }

    const clearQuery = () => {
        setQuery({
            date: '',
            time: '',
            lidar_id: '',
            site_id: '',
            deployment_id: '',
            state: null,
            city: null,
            street: null,
            cross_street: null,
            corner: ''
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
                            <DatePickerForm label='Capture Date' value={query.date}
                                            setter={(event: ChangeEvent<HTMLInputElement>) => handleTextForm(event.target.value, "date")}/>
                            <TimePickerForm label='Capture Time' value={query.time}
                                            setter={(event: ChangeEvent<HTMLInputElement>) => handleTextForm(event.target.value, "time")}/>
                            <TextForm label="Site ID" value={query.site_id}
                                      setter={(event: ChangeEvent<HTMLInputElement>) => handleTextForm(event.target.value, "site_id")}
                                      type="number"/>
                            <TextForm label="Sensor ID" value={query.lidar_id}
                                      setter={(event: ChangeEvent<HTMLInputElement>) => handleTextForm(event.target.value, "lidar_id")}
                                      type="number"/>
                            <TextForm label="Deployment ID" value={query.deployment_id}
                                      setter={(event: ChangeEvent<HTMLInputElement>) => handleTextForm(event.target.value, "deployment_id")}
                                      type="number"/>
                            <ComboboxForm label="State" optionsLoading={lidarMetadataListPending}
                                          options={geographicSelections.states}
                                          dataSetter={(value) => setQuery((prevState) => {
                                              return {...prevState, state: value}
                                          })}
                                          currentValue={query.state}
                                          optionsFilterFunction={(queryState) => filteredGeographicLocations(queryState,"states")}

                            />
                            <ComboboxForm label="City" optionsLoading={lidarMetadataListPending}
                                          options={geographicSelections.cities}
                                          dataSetter={(value) => setQuery((prevState) => {
                                              return {...prevState, city: value}
                                          })}
                                          currentValue={query.city}
                                          optionsFilterFunction={(queryState) => filteredGeographicLocations(queryState,"cities")}

                            />
                            <ComboboxForm label="Street" optionsLoading={lidarMetadataListPending}
                                          options={geographicSelections.streets}
                                          dataSetter={(value) => setQuery((prevState) => {
                                              return {...prevState, street: value}
                                          })}
                                          currentValue={query.street}
                                          optionsFilterFunction={(queryState) => filteredGeographicLocations(queryState,"streets")}

                            />
                            <ComboboxForm label="Cross Street" optionsLoading={lidarMetadataListPending}
                                          options={geographicSelections.cross_streets}
                                          dataSetter={(value) => setQuery((prevState) => {
                                              return {...prevState, cross_street: value}
                                          })}
                                          currentValue={query.cross_street}
                                          optionsFilterFunction={(queryState) => filteredGeographicLocations(queryState,"cross_streets")}

                            />
                            <CardinalDirectionsSelectForm value={query.corner}
                                                          setter={(value) => setQuery((prevState) => {
                                                              return {...prevState, corner: value}
                                                          })} />

                        </FormGroup>
                        <div className='flex flex-row gap-4 mt-4'>
                            <Button label="Query" icon={<FunnelIcon />} />
                            <Button label="Clear Query" icon={<XMarkIcon />} onClick={() => clearQuery()} />
                        </div>
                    </PaneSection>
                </Pane>
                <Pane stretch>
                    <PaneSection fillHeight>
                        <div className='flex flex-col gap-4 md:justify-between md:h-full'>
                            {databaseMetadataListPending && <LoadingSpinner/>}
                            {databaseMetadataListError && <ErrorMessage error={databaseMetadataListError}/>}
                            {databaseMetadataItems && !databaseMetadataListError && !databaseMetadataListPending && (
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