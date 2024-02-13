import Navigo from "navigo";
import { getData } from "../src/admin/handleCRUD";

export const render = (container, components) => document.querySelector(container).innerHTML = components

export const router = new Navigo('/', {linksSelector: 'a'})

export const data = await getData('users')
export const type = await getData('type')
export const status = await getData('status')
export const products = await getData('products');
export const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).username : '' ;