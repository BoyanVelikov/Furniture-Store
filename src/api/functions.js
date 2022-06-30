import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const register = api.register;
export const login = api.login;
export const logout = api.logout;

export async function create(data) {
    return await api.post(host + '/data/catalog', data);
}
export async function getAll() {
    return await api.get(host + '/data/catalog');
}
export async function details(id) {
    return await api.get(host + `/data/catalog/${id}`);
}
export async function update(id, data){
    return await api.put(host + `/data/catalog/${id}`, data);
}
export async function del(id){
    return await api.del(host + `/data/catalog/${id}`);
}
export async function myFurniture(){
    const userId = sessionStorage.getItem('userId')
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`);
}