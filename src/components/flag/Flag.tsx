import {ReactElement, useMemo} from "react";

export interface FlagProps_t {
    children: ReactElement | Array<ReactElement>;
    colorType: 'idle' | 'idle-dark' | 'active' | 'warning' | 'disabled';
}
export function Flag({colorType, children}: FlagProps_t) {

    const colorStyling: string = useMemo<string>(() => {
        if (colorType === 'idle-dark') return 'bg-slate-600 text-white'
        if (colorType === 'active') return 'bg-green-600 text-white'
        if (colorType === 'warning') return 'bg-yellow-500 text-white'
        if (colorType === 'disabled') return 'bg-red-400 text-white'
        return 'bg-neutral-300 text-neutral-500'
    }, [colorType])

    return (
        <div className={`${colorStyling} transition-colors flex justify-center items-center min-h-[20px] max-h-[20px] min-w-[20px] max-w-[20px] rounded-md`}>
            <span className='[&>*]:size-3'>
                {children}
            </span>
        </div>
    )
}