import {Pane} from "../../components/Pane.tsx";
import {PaneSection} from "../../components/PaneSection.tsx";
import useSiteMetadata from "../../hooks/useSiteMetadata.tsx";
import {useParams} from "react-router-dom";
import {Map} from "../../components/map/Map.tsx";
import {GeographicMarker} from "../../components/map/GeographicMarker.tsx";
import LoadingSpinner from "../../components/utilities/LoadingSpinner/LoadingSpinner.tsx";
import {ErrorMessage} from "../../components/utilities/ErrorMessage.tsx";
import {Descriptor} from "../../components/Descriptor.tsx";
import ItemList from "../../components/ItemList.tsx";
import {useStatus} from "../../hooks/useStatus.tsx";

export default function SiteMetadataView() {

    const {site_id} = useParams();
    const {isPending: siteMetadataPending, error: siteMetadataError, data} = useSiteMetadata(Number(site_id));
    const {isPending: statusPending, error: statusError, data: status} = useStatus({
        siteId: Number(site_id),
        fileInformationIncluded: true
    })

    const metadataItems = !siteMetadataPending && !siteMetadataError ? Object.entries(data?.siteMetadata).filter(([key, value]) => {
        if (key === "_id") return
        if (key === "intersection_center") return
        return {key: value}
    }).map(([key, value]) => {
        return (
            <Descriptor key={key} label={key.replace(/_/g, " ")}>
                {String(value)}
            </Descriptor>
        )
    }) : undefined;


    if (siteMetadataPending) return <LoadingSpinner/>
    if (siteMetadataError) return <ErrorMessage error={siteMetadataError}/>

    return (
        <>
            <Pane minimalWidth>
                <PaneSection label="Site Metadata" description="View metadata related to a site deployment.">
                    <ItemList>
                        {metadataItems}
                    </ItemList>
                </PaneSection>
                <PaneSection label="Sensors Status">
                    <ItemList label="PCAP Service">

                    </ItemList>
                    <ItemList label="ROS Service">

                    </ItemList>
                </PaneSection>
            </Pane>
            <Pane stretch>
                <PaneSection fillHeight>
                    <Map mapCenter={[data!.siteMetadata.latitude, data!.siteMetadata.longitude]} className='min-h-[350px] min-h-auto'>
                        <GeographicMarker center={[data!.siteMetadata.latitude, data!.siteMetadata.longitude]} />
                    </Map>
                </PaneSection>
            </Pane>
        </>
    )
}