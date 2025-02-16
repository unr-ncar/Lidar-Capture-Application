import { CogIcon, FolderArrowDownIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { Pane } from "../components/Pane";
import { PaneSection } from "../components/PaneSection";
import { ViewShell } from "../components/ViewShell";
import { Link } from "react-router-dom";

export default function LandingView() {

    const hyperlinks = [
        {
            label: "View Files",
            icon: <FolderArrowDownIcon />,
            description: "View recordings of LiDAR PCAPs and ROS files",
            link: "/explorer"
        },
        {
            label: "Create Recordings",
            icon: <VideoCameraIcon />,
            description: "Create a new ROS or PCAP recording",
            link: "/capture"
        },
        {
            label: "Adjust Gateway",
            icon: <CogIcon />,
            description: "Adjust the gateway configuration for infrastructure web services",
            link: "/settings"
        }
    ]

    return (
        <ViewShell>
            <Pane stretch>
                <PaneSection fillHeight>
                    <div className="flex flex-col lg:flex-row gap-6 items-center lg:justify-center lg:mt-6 lg:w-full">
                        {
                            hyperlinks.map(hyperlink => {
                                return (
                                    <Link to={hyperlink.link} className="flex flex-col items-center gap-0.5 max-w-[250px]">
                                        <div className="flex flex-col items-center">
                                            <span className="*:size-12">
                                                {hyperlink.icon}
                                            </span>
                                            <p className="font-medium">
                                                {hyperlink.label}
                                            </p>
                                        </div>
                                        <p className="text-sm text-center">
                                            {hyperlink.description}
                                        </p>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </PaneSection>
            </Pane>
        </ViewShell>
    )
}