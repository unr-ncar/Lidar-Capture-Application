import {ChangeEvent, useEffect, useState} from "react";
import {SelectForm, SelectOption} from "./SelectForm.tsx";

export interface CardinalDirectionsSelectForm_t {
    setter: (event: ChangeEvent<HTMLInputElement>) => void
    value: string;
}
export function CardinalDirectionsSelectForm({value, setter}: CardinalDirectionsSelectForm_t) {
    return (
        <SelectForm defaultValue='--' selected={value} setSelection={setter} label='Cardinal Direction'>
            <SelectOption label='NW' value='NW' />
            <SelectOption label='SE' value='SE' />
            <SelectOption label='SW' value='SW' />
            <SelectOption label='NE' value='NE' />
        </SelectForm>
    )
}