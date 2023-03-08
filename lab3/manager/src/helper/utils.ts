import { GENERALCOLOR } from './../model/misc';
import { EnumType } from "typescript";

//Check if value of string is number
const StringIsNumber = (value:string) => isNaN(Number(value)) === false;

//Turn Enum to array to be able to search
export function ToArray() {
    return Object.keys(GENERALCOLOR)
        .filter(StringIsNumber)
        .map((key:any) => GENERALCOLOR[key]); //??any
}

//This regex essentially expels everything that is not included in the alphabet.
//Used to check if brand names are similar. Nike == NIKE == nike© == Nike™ etc. To avoid duplications.
export function checkLatinCharacters(str: string):string{
    return str.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]+/g, "")
}