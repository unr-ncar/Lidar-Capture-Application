import * as Dialog from "@radix-ui/react-dialog";
import {Dispatch, ReactElement, SetStateAction} from "react";

interface modal_t {
    children: ReactElement
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>
}
export default function Modal({children, open, onOpenChange}: modal_t) {

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur' />
                <Dialog.Content className='fixed inset-20 bg-white rounded-lg drop-shadow-lg'>
                    { children }
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}