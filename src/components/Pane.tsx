import {ReactElement} from "react";
import {PaneSectionProps_t} from "./PaneSection.tsx";

export interface PaneProps_t {
    children: ReactElement<PaneSectionProps_t> | Array<ReactElement<PaneSectionProps_t>> | undefined;
    stretch?: boolean;
    minimalWidth?: boolean;
}

export function Pane({children, stretch, minimalWidth}: PaneProps_t) {

    return (
        <div
            className={`${stretch ? 'grow' : null} ${!stretch ? 'md:max-w-[450px]' : null} ${minimalWidth ? 'md:min-w-[350px]' : null} flex flex-col gap-6 p-6 md:overflow-y-auto md:h-full`}>
            <div className='grow h-full flex flex-col gap-6 [&>*:last-child]:border-0 [&>*]:border-b-2 [&>*]:border-neutral-100 [&>*]:pb-6'>
                {children}
            </div>
        </div>
    )
}