import {Fieldset, FieldsetProps, Legend} from "@headlessui/react";
import {ReactElement} from "react";
import {RadioFormProps_t, RadioItemProps_t} from "./RadioForm.tsx";
import {SelectFormProps_t} from "./SelectForm.tsx";

export interface FormGroupProps_t extends FieldsetProps {
    label: string;
    children: ReactElement<RadioFormProps_t | SelectFormProps_t> | Array<ReactElement<RadioItemProps_t | SelectFormProps_t>>;
}
export function FormGroup(props: FormGroupProps_t) {
    const { label, children, ...rest } = props;

    return (
        <Fieldset {...rest} className='flex flex-col gap-3'>
            <Legend className='uppercase text-neutral-400 font-semibold text-sm'>
                { label }
            </Legend>
            <div>
                {children}
            </div>
        </Fieldset>
    )
}