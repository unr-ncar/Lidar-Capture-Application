import {ChangeEvent} from "react";
import {Field, Input, Label} from "@headlessui/react";

export interface DatePickerFormProps_t {
    label: string;
    setter: (event: ChangeEvent<HTMLInputElement>) => void
    value: string;
}
export function DatePickerForm({label, setter, value}: DatePickerFormProps_t) {
    return (
        <Field className='flex flex-row gap-2 place-items-center border-2 border-neutral-200 p-2 rounded-md'>
            <Label className='font-medium text-sm text-neutral-400'>
                {label}
            </Label>
            <Input className='text-neutral-400 outline-0 appearance-none grow bg-neutral-100 p-1 rounded-md' type='date' value={value} onChange={(event) => setter(event)} />
        </Field>
    )
}
/*export function DatePickerForm() {



    return (
        <Menu>
            <div className='flex flex-row gap-2 border-2 border-neutral-200 p-2 rounded-md'>
                <input className='w-full' placeholder='mm/dd/yyyy' />
                <MenuButton className='flex items-center place-content-center bg-neutral-200 w-8 h-8 rounded '>
                    <span>
                        <CalendarDaysIcon className='size-5' />
                    </span>
                </MenuButton>
            </div>
            <MenuItems anchor='bottom' className='box-content bg-neutral-100 p-2 mr-10 rounded-md drop-shadow-lg w-[200px] h-[200px]'>
                <div className=''>
                    <p>
                        1
                    </p>
                    <p>
                        2
                    </p>
                    <p>
                        3
                    </p>
                </div>
            </MenuItems>
        </Menu>
    )
}*/

