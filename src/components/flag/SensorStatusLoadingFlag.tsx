import {Flag} from "./Flag.tsx";
import Loading from "react-loading";

export default function SensorStatusLoadingFlag() {
    return (
        <Flag colorType='idle-dark'>
            <Loading type='spin' width={10} height={10}/>
        </Flag>
    )
}