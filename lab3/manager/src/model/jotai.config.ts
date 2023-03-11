
import { atom, useAtom } from 'jotai';
import { Admin } from './config';
import { Product } from './product';


export const sessionAtom = atom<Admin|undefined>(undefined);
