import {get, post} from './http';

export const login = (params:any) => post(`user/login`,params);