import {Dispatch, SetStateAction} from "react";
import {Menu, MenuButton, MenuItems} from "@headlessui/react";
import {CalendarDaysIcon} from "@heroicons/react/20/solid";

export interface DatePickerFormProps_t {
    setter: Dispatch<SetStateAction<Date>>;
    value: Date;
}
export function DatePickerForm() {


    return (
        <Menu>
            <div className='flex flex-row gap-2 bg-neutral-100 p-2 rounded-md'>
                <input className='w-full' />
                <MenuButton>
                    <span>
                        <CalendarDaysIcon className='size-5' />
                    </span>
                </MenuButton>
            </div>
            <MenuItems>
                <div className='bg-neutral-100 p-2 rounded-md'>
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
}