
import { atom, useAtom } from 'jotai';
import { Product } from './product';
import {multiProduct, User} from './types'

export const sessionAtom = atom<User|undefined>(undefined);
export const cartAtom = atom<multiProduct[]>([]);
export const orderAtom = atom<{id:number,items:multiProduct[]}|undefined>(undefined);