import {
    Combobox,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptionProps,
    ComboboxOptions,
    Field,
    Label
} from "@headlessui/react";
import {ChangeEvent, useState} from "react";

export function ComboboxOptionItem({value, ...rest}: ComboboxOptionProps) {
    return (
        <ComboboxOption {...rest} value={value} className='group px-2 py-1 flex flex-row justify-between items-center gap-1 text-neutral-400 hover:text-white hover:bg-black transition-colors'>
            {value}
        </ComboboxOption>
    )
}

export interface ComboboxFormProps_t {
    optionsLoading: boolean;
    label: string;
    dataSetter: (value: string) => void;
    currentValue: string | null;
    options: Array<string>;
    optionsFilterFunction: (queryState: string) => Array<string>;
}
export function ComboboxForm({label, optionsLoading, options, dataSetter, currentValue, optionsFilterFunction}: ComboboxFormProps_t) {

    const [query, setQuery] = useState<string>('')
    const selections = query === '' ? options : optionsFilterFunction(query);

    return (
        <Field className="flex flex-row gap-3 place-items-center border-2 border-neutral-200 p-2 rounded-md" disabled={optionsLoading}>
            <Label className='font-medium text-sm text-neutral-400'>
                {label}
            </Label>
            <Combobox value={currentValue} onClose={() => setQuery('')} onChange={(value: string) => dataSetter(value)} >
                <ComboboxInput className={`${optionsLoading && 'animate-pulse'} text-neutral-400 outline-0 appearance-none grow bg-neutral-100 p-1 rounded-md data-[focus]:bg-blue-50`} onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} />
                <ComboboxOptions anchor='bottom' className='my-2 min-w-[200px] max-w-[300px] flex flex-col rounded-md bg-neutral-50 shadow-lg [&>*]:min-w-[200px] [&>*]:max-w-[300px]  [&>*:last-child]:border-0 [&>*]:border-b-2 [&>*]:border-neutral-100'>
                    {selections.map((selection) => {
                        return <ComboboxOptionItem key={selection} value={selection} className='group px-2 py-1 flex flex-row justify-between items-center gap-1 text-neutral-400 hover:text-white hover:bg-black transition-colors'>
                            {selection}
                        </ComboboxOptionItem>
                    })}
                </ComboboxOptions>
            </Combobox>
        </Field>
    )

}