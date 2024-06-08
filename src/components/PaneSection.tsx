import {ReactElement} from "react";

interface PaneHeaderProps_t {
    label?: string;
    description?: string;
}
export function PaneHeader({label, description}: PaneHeaderProps_t) {

    if (!label) return null

    return (
        <div>
            <p className='font-bold text-xl mb-0.5'>
                {label}
            </p>
            {description && (
                <p className='italic text-neutral-400'>
                    {description}
                </p>
            )}
        </div>
    )
}

export interface PaneSectionProps_t {
    label?: string;
    description?: string;
    children: ReactElement | Array<ReactElement> | undefined;
}
export function PaneSection({label, description, children}: PaneSectionProps_t) {
    return (
        <div className="flex flex-col gap-6">
            <PaneHeader label={label} description={description}/>
            <div>
                {children}
            </div>
        </div>
    )
}