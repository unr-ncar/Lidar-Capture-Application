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

export interface PaneProps_t {
    children: ReactElement | Array<ReactElement>;
    label?: string;
    description?: string;
    stretch?: boolean;
}

export function Pane({children, label, description, stretch}: PaneProps_t) {
    return (
        <div className={`${stretch ? 'h-full' : null} ${!stretch ? 'md:max-w-[450px]' : null} grow flex flex-col gap-6 p-6 md:overflow-y-auto md:h-full`}>
            <PaneHeader label={label} description={description} />
            <div>
                { children }
            </div>
        </div>
    )
}