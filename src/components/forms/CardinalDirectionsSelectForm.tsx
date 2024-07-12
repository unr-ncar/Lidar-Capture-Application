import {SelectForm, SelectOption} from "./SelectForm.tsx";

export interface CardinalDirectionsSelectForm_t {
    setter: (value: string) => void
    value: string | undefined;
}
export function CardinalDirectionsSelectForm({value, setter}: CardinalDirectionsSelectForm_t) {

    return (
        <SelectForm defaultValue='--' selected={value} setSelection={(value) => setter(value)} label='Cardinal Direction'>
            <SelectOption label='NW' value='NW' />
            <SelectOption label='SE' value='SE' />
            <SelectOption label='SW' value='SW' />
            <SelectOption label='NE' value='NE' />
        </SelectForm>
    )
}