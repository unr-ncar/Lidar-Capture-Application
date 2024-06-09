/* eslint-disable  @typescript-eslint/no-explicit-any */
import {Description, Field, Label, Select, SelectProps} from '@headlessui/react'
import {Dispatch, ReactElement, SetStateAction} from "react";
import {ChevronUpDownIcon} from "@heroicons/react/16/solid";

export interface SelectOptionProps_t {
    label: string;
    value: string;
}
export function SelectOption({label, value}: SelectOptionProps_t) {
    return (
        <option value={value}>
            { label }
        </option>
    )
}

export interface SelectFormProps_t extends SelectProps {
    children: Array<ReactElement<SelectOptionProps_t>>;
    label: string;
    description?: string;
    selected: any;
    setSelection: Dispatch<SetStateAction<any>>;
}
export function SelectForm(props: SelectFormProps_t) {

    const {children, label, description, selected, setSelection, ...rest} = props;

    return (
        <Field className='flex flex-row items-center gap-4'>
            <div className='flex flex-col gap-1 w-full'>
                <Label className="text-xs text-neutral-400 font-medium uppercase">{label}</Label>
                {description && (
                    <Description className="leading-snug">{description}</Description>
                )}
            </div>
            <div className='flex flex-row items-center bg-neutral-200 text-neutral-400 px-2 py-0.5 rounded-md text-sm'>
                <Select {...rest} value={selected} onChange={event => setSelection(event.target.value)} name={label} className="appearance-none bg-transparent">
                    {children}
                </Select>
                <ChevronUpDownIcon className='size-4' />
            </div>
        </Field>
    )
}