import {ButtonProps} from "@headlessui/react";
import {ReactElement} from "react";

export interface ButtonProps_t extends ButtonProps {
    label: string;
    icon?: ReactElement;
}
export function Button({label, icon, ...rest}: ButtonProps_t) {
    return (
        <Button label={label} {...rest}>
            { icon && (
                <span>
                    {icon}
                </span>
            )}
            <p>
                {label}
            </p>
        </Button>
    )
}