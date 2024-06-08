/* eslint-disable  @typescript-eslint/no-explicit-any */
import {Dispatch, ReactElement, SetStateAction} from "react";
import {Field, Label, Radio, RadioGroup} from "@headlessui/react";

export interface RadioItemProps_t {
    label: string;
    value: string;
}
export function RadioItem({label, value}: RadioItemProps_t) {
    return (
        <Field>
            <Radio value={value} className="group data-[checked]:bg-black data-[checked]:text-white hover:bg-black hover:text-white transition-colors px-2 py-1 rounded-md bg-neutral-200 text-neutral-400 font-medium text-sm">
                <Label className="">{label}</Label>
            </Radio>
        </Field>
    )
}

export interface RadioFormProps_t {
    children: Array<ReactElement<RadioItemProps_t>>;
    formLabel: string;
    selected: any;
    setSelection: Dispatch<SetStateAction<any>>;
}

export function RadioForm({formLabel, children, selected, setSelection}: RadioFormProps_t) {
    return (
        <div className='flex flex-col gap-2 w-full'>
            <p className='font-medium uppercase text-xs text-neutral-400'>
                {formLabel}
            </p>
            <RadioGroup className='flex flex-row gap-2 flex-wrap' value={selected} onChange={setSelection} aria-label={formLabel}>
                {children}
            </RadioGroup>
        </div>
    )
}