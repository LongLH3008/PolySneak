import Navigo from "navigo";

export const render = (container, components) => document.querySelector(container).innerHTML = components

export const router = new Navigo('/', {linksSelector: 'a'})
