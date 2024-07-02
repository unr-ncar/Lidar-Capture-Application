import {Pane} from "../../components/Pane.tsx";
import {PaneSection} from "../../components/PaneSection.tsx";
import {useFileQuery} from "../../hooks/useFileQuery.tsx";
import {useParams} from "react-router-dom";
import {Descriptor} from "../../components/Descriptor.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import ItemList from "../../components/ItemList.tsx";

export default function FileMetadataView() {

    const { fileName} = useParams();
    const {isPending, error, data} = useFileQuery(String(fileName))

    console.log(!isPending && data)

    if (isPending) return <LoadingSpinner />

    return (
        <>
            <Pane minimalWidth>
                <PaneSection>
                    <div className='md:max-w-[300px]'>
                        <ItemList>
                            <Descriptor label="FILE NAME">
                                {data!.filename}
                            </Descriptor>
                            <Descriptor label="FILE SIZE">
                                {data!.file_size} Bytes
                            </Descriptor>
                            <Descriptor label="LIDAR ID">
                                LIDAR {data!.lidar_id}
                            </Descriptor>
                            <Descriptor label="SITE ID">
                                SITE {data!.site_id}
                            </Descriptor>
                            <Descriptor label="DEPLOYMENT ID">
                                DEPLOYMENT {data!.deployment_id}
                            </Descriptor>
                            <Descriptor label="STREET">
                                {data!.street}
                            </Descriptor>
                            <Descriptor label="CROSS STREET">
                                {data!.crossstreet}
                            </Descriptor>
                            <Descriptor label="CORNER">
                                {data!.corner}
                            </Descriptor>
                            <Descriptor label="CITY">
                                {data!.city}
                            </Descriptor>
                            <Descriptor label="STATE">
                                {data!.state}
                            </Descriptor>
                        </ItemList>
                    </div>
                </PaneSection>
            </Pane>
            <Pane stretch>
                <PaneSection>
                    <p>
                        Pane
                    </p>
                </PaneSection>
            </Pane>
        </>
    )
}