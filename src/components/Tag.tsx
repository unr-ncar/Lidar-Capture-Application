import {ButtonHTMLAttributes, ReactElement} from "react";

export interface TagProps_t extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    label?: string;
    icon?: ReactElement;
    value: string;
}
export function Tag(props: TagProps_t) {

    const { className, label, value, icon, onClick, ...rest } = props;

    const containerStyling = `${className} ${onClick ? "text-neutral-400 bg-neutral-200 hover:text-white hover:bg-black hover:border-black transition-colors" : " text-neutral-400 border-neutral-300 "} flex flex-row gap-1 items-center text-xs border-2 rounded-md px-1 py-0.5 h-min`
    const textStyling = 'font-semibold text-nowrap uppercase'

    const tagIcon = icon ? (
        <span className='[&>*]:size-4'>
            {icon}
        </span>
    ) : undefined

    if (onClick) {
        return (
            <button onClick={onClick} {...rest} className={containerStyling}>
                {tagIcon}
                <p className={textStyling}>
                    { label && <span className='font-semibold'>{label}:{' '}</span> }{value}
                </p>
            </button>
        )
    } else {
        return (
            <div className={containerStyling}>
                {tagIcon}
                <p className={textStyling}>
                    { label && <span className='font-semibold '>{label}:{' '}</span>}{value}
                </p>
            </div>
        )
    }

}