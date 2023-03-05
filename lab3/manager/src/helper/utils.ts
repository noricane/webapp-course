import { GENERALCOLOR } from './../model/misc';
import { EnumType } from "typescript";

const StringIsNumber = (value:string) => isNaN(Number(value)) === false;

export function ToArray() {
    return Object.keys(GENERALCOLOR)
        .filter(StringIsNumber)
        .map((key:any) => GENERALCOLOR[key]); //??any
}