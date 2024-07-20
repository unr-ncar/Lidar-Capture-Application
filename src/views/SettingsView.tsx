import {ViewShell} from "../components/ViewShell.tsx";
import {PaneGroup} from "../components/PaneGroup.tsx";
import {Pane} from "../components/Pane.tsx";
import ItemList from "../components/ItemList.tsx";
import useGatewayConfiguration from "../hooks/useGatewayConfiguration.tsx";
import {Descriptor} from "../components/Descriptor.tsx";
import {PaneSection} from "../components/PaneSection.tsx";
import {FormGroup} from "../components/forms/FormGroup.tsx";
import {useState} from "react";
import {GatewayConfiguration_t} from "../types.tsx";
import {TextForm} from "../components/forms/TextForm.tsx";
import Button from "../components/Button.tsx";
import {ArrowPathIcon, XMarkIcon} from "@heroicons/react/20/solid";

export default function SettingsView() {

    const backendConfiguration = useGatewayConfiguration((state) => state.configuration)
    const setGatewayPath = useGatewayConfiguration((state) => state.setGatewayPath)
    const setMetadataServicePort = useGatewayConfiguration((state) => state.setMetadataServicePort)
    const setGraphqlServicePort = useGatewayConfiguration((state) => state.setGraphqlServicePort)
    const setRosRecordingServicePort = useGatewayConfiguration((state) => state.setRosRecordingServicePort)
    const setPcapRecordingServicePort = useGatewayConfiguration((state) => state.setPcapRecordingServicePort)
    const setFileServicePort = useGatewayConfiguration((state) => state.setFileServicePort)
    const setClusterWebServerPort = useGatewayConfiguration((state) => state.setClusterWebServerPort)

    const [configuration, setConfiguration] = useState<GatewayConfiguration_t>(backendConfiguration)

    const metadataItems = Object.entries(backendConfiguration).map(([key, value]) => {
        return (
            <Descriptor key={key} label={key.replace(/_/g, " ")}>
                {String(value)}
            </Descriptor>
        )
    })

    const handleTextForm = (value: string, key: keyof GatewayConfiguration_t) => {
        setConfiguration((prevState) => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    const updateParamters = () => {
        setGatewayPath(configuration.gateway_path)
        setMetadataServicePort(configuration.metadata_service_port)
        setGraphqlServicePort(configuration.graphql_service_port)
        setRosRecordingServicePort(configuration.ros_recording_service_port)
        setPcapRecordingServicePort(configuration.pcap_recording_service_port)
        setFileServicePort(configuration.file_service_port)
        setClusterWebServerPort(configuration.cluster_web_server_port)
    }

    const resetParameters = () => {
        setConfiguration(backendConfiguration)
    }

    return (
        <ViewShell>
            <PaneGroup>
                <Pane minimalWidth>
                    <PaneSection label="Application Backend Configuration"
                                 description="View the URL's used by the application to query backend and edge services.">
                        <ItemList>
                            {metadataItems}
                        </ItemList>
                    </PaneSection>
                </Pane>
                <Pane stretch>
                    <PaneSection label="Edit Backend Configuration"
                                 description="Edit the URL's used by the application to query backend and edge services.">
                        <ItemList className='md:max-w-[500px]'>
                            <FormGroup label="Configuration Parameters">
                                <TextForm label="Gateway Path"
                                          setter={(event) => handleTextForm(event.target.value, "gateway_path")}
                                          value={configuration.gateway_path} type="text"/>
                                <TextForm label="Metadata Service Port"
                                          setter={(event) => handleTextForm(event.target.value, "metadata_service_port")}
                                          value={String(configuration.metadata_service_port)} type="number"/>
                                <TextForm label="GraphQL Service Port"
                                          setter={(event) => handleTextForm(event.target.value, "graphql_service_port")}
                                          value={String(configuration.graphql_service_port)} type="number"/>
                                <TextForm label="ROS Recording Service Port"
                                          setter={(event) => handleTextForm(event.target.value, "ros_recording_service_port")}
                                          value={String(configuration.ros_recording_service_port)} type="number"/>
                                <TextForm label="PCAP Recording Service Port"
                                          setter={(event) => handleTextForm(event.target.value, "pcap_recording_service_port")}
                                          value={String(configuration.pcap_recording_service_port)} type="number"/>
                                <TextForm label="File Service Port"
                                          setter={(event) => handleTextForm(event.target.value, "file_service_port")}
                                          value={String(configuration.file_service_port)} type="number"/>
                                <TextForm label="Cluster Web Server Port"
                                          setter={(event) => handleTextForm(event.target.value, "cluster_web_server_port")}
                                          value={String(configuration.cluster_web_server_port)} type="number"/>
                            </FormGroup>
                            <div className='flex flex-row gap-4'>
                                <Button label="Update Parameters" icon={<ArrowPathIcon/>} onClick={() => updateParamters()}/>
                                <Button label="Reset Parameters" icon={<XMarkIcon/>} onClick={() => resetParameters()}/>
                            </div>
                        </ItemList>
                    </PaneSection>
                </Pane>
            </PaneGroup>
        </ViewShell>
    )
}