
import { atom, useAtom } from 'jotai';
import {User} from './user'

export const sessionAtom = atom<User|undefined>(undefined);