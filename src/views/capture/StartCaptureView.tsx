import {PaneSection} from "../../components/PaneSection.tsx";
import {Pane} from "../../components/Pane.tsx";
import {Map} from "../../components/map/Map.tsx";

export default function StartCaptureView() {
    return (
        <>
            <Pane minimalWidth>
                <PaneSection>
                    <p>
                        Testing
                    </p>
                </PaneSection>
            </Pane>
            <Pane>
                <PaneSection>
                    <Map>

                    </Map>
                </PaneSection>
            </Pane>
        </>
    )
}