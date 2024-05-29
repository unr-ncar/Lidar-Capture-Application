import {ReactElement} from "react";
import {PaneProps_t} from "./Pane.tsx";

export interface PaneGroupProps_t {
    children?: ReactElement<PaneProps_t> | Array<ReactElement<PaneProps_t>>
}
export function PaneGroup({children}: PaneGroupProps_t) {
    return (
        <div className='w-full h-full flex flex-col [&>*:last-child]:border-0 [&>*]:border-b-2 [&>*]:border-neutral-100 md:flex-row md:[&>*]:border-b-0 md:[&>*]:border-r-2'>
            { children }
        </div>
    )
}