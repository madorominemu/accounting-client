import {get, post} from './http';

export const getAllAccount = (id:number) => get(`account/all?id=${id}`);

export const setAccount = (params:any) => post(`account/add`,params);

export const updateAccount = (params:any) => post(`account/update`,params);

export const deleteAccount = (id:number) => get(`account/delete?id=${id}`);