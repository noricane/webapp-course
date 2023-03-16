
import { atom, useAtom } from 'jotai';
import { Product } from './types';
import {multiProduct, User} from './types'


/* Jotai is a great lightweight global state management library that allows for usage of react native conventions like hooks. 
Here the state objects are initialized, in jotai they are called atoms and are */
export const sessionAtom = atom<User|undefined>(undefined);
export const cartAtom = atom<multiProduct[]>([]);
export const orderAtom = atom<{id:number,items:multiProduct[]}|undefined>(undefined);