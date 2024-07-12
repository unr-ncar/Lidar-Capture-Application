import {ButtonProps, Button} from "@headlessui/react";
import {ReactElement} from "react";

export interface ButtonProps_t extends ButtonProps {
    label: string;
    icon?: ReactElement;
}
export default function({label, icon, ...rest}: ButtonProps_t) {
    return (
        <Button {...rest} className='flex flex-row gap-1 items-center bg-neutral-200 text-neutral-400 text-sm font-medium px-2 py-1 rounded-md hover:bg-black hover:text-white transition-colors'>
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