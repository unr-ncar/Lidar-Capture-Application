import {Checkbox, Description, Field, Label} from "@headlessui/react";
import {CheckIcon} from "@heroicons/react/16/solid";
import {Dispatch, SetStateAction} from "react";

export interface CheckboxFormProps_t {
    label: string;
    description?: string;
    checked: boolean;
    onChange: Dispatch<SetStateAction<boolean>>;
}
export default function CheckboxForm({label, description, checked, onChange}: CheckboxFormProps_t) {
    return (
        <Field className='flex flex-row items-center justify-between'>
            <div className='flex flex-col'>
                <Label className='uppercase text-sm font-medium text-neutral-400'>
                    { label }
                </Label>
                <Description className='leading-snug'>
                    { description }
                </Description>
            </div>
            <Checkbox checked={checked} onChange={onChange} className='group flex place-content-center place-items-center w-[20px] min-w-[20px] h-[20px] min-h-[20px] rounded-md border-2 border-black data-[checked]:bg-black transition-colors'>
                <CheckIcon className='hidden group-data-[checked]:block size-3 text-white' />
            </Checkbox>
        </Field>
    )
}