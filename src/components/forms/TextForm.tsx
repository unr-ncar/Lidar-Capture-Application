import {ChangeEvent} from "react";
import {Field, Input, Label} from "@headlessui/react";

export interface TextFormProps_t {
    label: string;
    setter: (event: ChangeEvent<HTMLInputElement>) => void
    value: string;
    type: 'number' | 'email' | 'password';
}
export function TextForm({label, type, setter, value}: TextFormProps_t) {
    return (
        <Field className='flex flex-row gap-3 place-items-center border-2 border-neutral-200 p-2 rounded-md'>
            <Label className='font-medium text-sm text-neutral-400'>
                {label}
            </Label>
            <Input className='text-neutral-400 outline-0 appearance-none grow bg-neutral-100 p-1 rounded-md data-[focus]:bg-blue-50' type={type} value={value} onChange={(event) => setter(event)} />
        </Field>
    )
}