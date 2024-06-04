/* eslint-disable  @typescript-eslint/no-explicit-any */
import {Dispatch, ReactElement, SetStateAction} from "react";
import {Field, Label, Radio, RadioGroup} from "@headlessui/react";

export interface RadioFormItemProps_t {
    label: string;
    value: string;
}

export function RadioFormItem({label, value}: RadioFormItemProps_t) {
    return (
        <Field className="">
            <Radio value={value} className="group data-[checked]:bg-black data-[checked]:text-white hover:bg-black hover:text-white transition-colors  px-2 py-1 rounded-md bg-neutral-200 text-neutral-400 font-medium text-sm">
                <Label className="">{label}</Label>
            </Radio>
        </Field>
    )
}

export interface RadioFormProps_t {
    children: Array<ReactElement<RadioFormItemProps_t>>;
    formLabel: string;
    selected: any;
    setSelection: Dispatch<SetStateAction<any>>;
}

export function RadioForm({formLabel, children, selected, setSelection}: RadioFormProps_t) {
    return (
        <div className='flex flex-row items-center gap-2 border-r-2 border-r-neutral-300 pr-2 w-fit'>
            <p className='font-medium'>
                {formLabel}
            </p>
            <RadioGroup className='flex flex-row gap-2' value={selected} onChange={setSelection} aria-label={formLabel}>
                {children}
            </RadioGroup>
        </div>
    )
}