import {Field, Input, Label} from "@headlessui/react";
import {DatePickerFormProps_t} from "./DatePickerForm.tsx";

export function TimePickerForm({label, setter, value}: DatePickerFormProps_t) {
    return (
        <Field className='flex flex-row gap-2 place-items-center border-2 border-neutral-200 p-2 rounded-md'>
            <Label className='font-medium text-sm text-neutral-400'>
                {label}
            </Label>
            <Input className='text-neutral-400 outline-0 appearance-none grow' type='time' value={value} onChange={(event) => setter(event)} />
        </Field>
    )
}