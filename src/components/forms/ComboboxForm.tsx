import {Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Label} from "@headlessui/react";
import {ReactElement, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import useLidarMetadataList from "../../hooks/useLidarMetadataList.tsx";

export interface ComboboxOptionProps_t {
    label: string;
}

export interface ComboboxFormProps_t {
    label: string;
    data: Array<unknown>;
    filterFunction: () => Array<unknown>;
}
export function ComboboxForm({label, data, filterFunction}: ComboboxFormProps_t) {

    return (
        <Field>
            <Label>
                {label}
            </Label>
            <Combobox>
                <ComboboxInput />
                <ComboboxOptions anchor='bottom'>
                    <ComboboxOption value="8th" />
                    <ComboboxOption value="9th" />
                    <ComboboxOption value="10th" />
                </ComboboxOptions>
            </Combobox>
        </Field>
    )

}