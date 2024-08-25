import {ButtonProps, Button} from "@headlessui/react";
import {ReactElement} from "react";

export interface ButtonProps_t extends ButtonProps {
    label: string;
    icon?: ReactElement;
    className?: string;
}
export default function({label, icon, className, ...rest}: ButtonProps_t) {
    return (
        <Button {...rest} className={`${className} flex flex-row gap-1 items-center bg-neutral-200 text-neutral-400 text-sm font-medium px-2 py-1 rounded-md hover:bg-black hover:text-white transition-colors disabled:bg-neutral-100 disabled:text-neutral-300`}>
            { icon && (
                <span className='[&>*]:size-4'>
                    {icon}
                </span>
            )}
            <p>
                {label}
            </p>
        </Button>
    )
}