
import { atom, useAtom } from 'jotai';
import { Product } from './product';
import {multiProduct, User} from './user'

export const sessionAtom = atom<User|undefined>(undefined);
export const cartAtom = atom<multiProduct[]>([]);