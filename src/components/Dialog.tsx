import {ReactElement} from "react";
import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import Button, {ButtonProps_t} from "./Button.tsx";

export interface DialogProps_t {
    title?: string;
    closeFunction: () => void;
    actionButton?: ReactElement<ButtonProps_t>;
    children: ReactElement | Array<ReactElement>;
    isOpen: boolean;
}
export default function ({title, closeFunction, actionButton, isOpen, children}: DialogProps_t) {
    return (
        <dialog open={isOpen} className='fixed w-full h-full z-[1000] top-0 left-0 backdrop-blur bg-black/70'>
            <div className='fixed w-full inset-10 bg-white'>
                <p>
                    {title}
                </p>
                <div className='grow overflow-y-auto'>
                    {children}
                </div>
                <div>
                    {actionButton}
                </div>
            </div>
        </dialog>
    )
}