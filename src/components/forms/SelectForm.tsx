/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
    Description, Field,
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptionProps,
    ListboxOptions,
    ListboxProps
} from '@headlessui/react'
import {Dispatch, ReactElement, SetStateAction} from "react";
import {CheckIcon, ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid";

export interface SelectOptionProps_t extends ListboxOptionProps{
    label: string;
    value: string;
}
export function SelectOption({label, value, ...rest}: SelectOptionProps_t) {
    return (
        <ListboxOption {...rest} value={value} className='group px-2 py-1 flex flex-row justify-between items-center gap-1 text-neutral-400 hover:text-white hover:bg-black transition-colors'>
            <p className='font-medium line-clamp-1'>
                { label }
            </p>
            <CheckIcon className='size-4 hidden group-data-[selected]:block' />
        </ListboxOption>
    )
}

export interface SelectFormProps_t extends ListboxProps {
    children: Array<ReactElement<SelectOptionProps_t>>;
    label: string;
    description?: string;
    selected: any;
    setSelection: (value: string) => void;
}
export function SelectForm(props: SelectFormProps_t) {

    const {children, label, description, selected, setSelection, defaultValue, ...rest} = props;

    return (
        <Field className='flex flex-row items-center justify-between'>
            <div className='flex flex-col'>
                <Label className='uppercase text-sm font-medium text-neutral-400'>
                    {label}
                </Label>
                { description && (
                    <Description className='leading-snug'>
                        {description}
                    </Description>
                )}
            </div>
            <Listbox {...rest} value={selected} onChange={(value) => setSelection(value)}>
                <ListboxButton className='group min-w-[100px] h-min px-2 py-1 flex flex-row justify-between items-center gap-1 bg-black text-white rounded-md data-[open]:rounded-b-none'>
                    <p className='uppercase font-medium'>
                        {selected ? selected : defaultValue}
                    </p>
                    <ChevronDownIcon className='block size-4 group-data-[open]:hidden' />
                    <ChevronUpIcon className='hidden size-4 group-data-[open]:block' />
                </ListboxButton>
                <ListboxOptions anchor='bottom' className='min-w-[100px] flex flex-col bg-white rounded-b-md shadow-lg [&>*]:min-w-[100px] [&>*:last-child]:border-0 [&>*]:border-b-2 [&>*]:border-neutral-100'>
                    {children}
                </ListboxOptions>
            </Listbox>
        </Field>
    )
}