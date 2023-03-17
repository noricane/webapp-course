import { multiProduct } from '../model/types';

import { EnumType } from "typescript";
import { GENERALCOLOR } from "../model/types";
import { getProductCollection } from '../api';

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
    return str.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]+/g, "").toLowerCase()
}

export async function updateCart(list:multiProduct[]):Promise<string | multiProduct[]>{
    try{
        if(list.length == 0){
            return []
        }
        console.log("list here", list);
        const res = await getProductCollection(list)
        console.log("response here", res);

        return Array.isArray(res) ? res : 'undefined'
    }catch(e){
        return e as string

    }
}