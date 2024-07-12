import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Label} from "@headlessui/react";
import {ChangeEvent, useState} from "react";

export interface ComboboxOptionProps_t {
    label: string;
}

export interface ComboboxFormProps_t {
    label: string;
    dataSetter: (value: string) => void;
    currentValue: string | null;
    options: Array<string>;
    optionsFilterFunction: (queryState: string) => Array<string>;
}
export function ComboboxForm({label, options, dataSetter, currentValue, optionsFilterFunction}: ComboboxFormProps_t) {

    const [query, setQuery] = useState<string>('')
    const selections = query === '' ? options : optionsFilterFunction(query);

    return (
        <Field>
            <Label>
                {label}
            </Label>
            <Combobox value={currentValue} onClose={() => setQuery('')} onChange={(value: string) => dataSetter(value)}>
                <ComboboxInput onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} />
                <ComboboxOptions anchor='bottom'>
                    {selections.map((selection) => {
                        return <ComboboxOption key={selection} value={selection}>
                            {selection}
                        </ComboboxOption>
                    })}
                </ComboboxOptions>
            </Combobox>
        </Field>
    )

}