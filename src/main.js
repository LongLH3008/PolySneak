// import Navigo from "navigo";
import HomePage from "./pages/home";
import DetailProductPage from "./pages/details_product";
import ContactPage from "./pages/contact";
import ErrorPage from "./pages/404_notfound";
import ListProductPage from "./pages/list_product";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";
import SignUpHandler from "./handler/signup";
import DetailProductHandler from "./handler/detailproduct";
import SignInHandler from "./handler/signin";
import ActiveStatus from "./handler/activeStatus";
import { sendRequest, getData, deleteData, updateData, createData } from './admin/handleCRUD.js';
import HomeAdminPage from "./adminPages/home.js";
import ProductsAdminPage from "./adminPages/products.js";

import { render, router } from "../utils/index.js";
import UsersAdminPage from "./adminPages/users.js";
import addUser from "./adminPages/addUser.js";
import { AddUser , changeRules, deleteUser } from "./handler/user.js";

router.on('/', () => render('#app', HomePage()));

router.on('/signin', () => {
  render('#app', SigninPage());
  SignInHandler();
})

router.on('/signup', () => {
  render('#app', SignupPage());
  SignUpHandler();
})

router.on('/signout', () => {
  localStorage.removeItem('user');
  alert('See you again !')
  router.navigate('/')
});

router.on('/contact', () => render('#app', ContactPage()));
router.on('/product', () => render('#app', ListProductPage()));

router.on('/detailproduct/:id', ({ data }) => {
  render('#app', DetailProductPage(data.id));
  DetailProductHandler();
})

router.on('/admin', () => render('#app', HomeAdminPage()));
router.on('/admin/products', () => render('#app', ProductsAdminPage()));

router.on('/admin/users', () => {
  render('#app', UsersAdminPage());
  changeRules();
  deleteUser();
})

router.on('/admin/addUser', () => {
  render('#app', addUser())
  AddUser();
})

router.notFound = () => render('#app', ErrorPage())

router.resolve();

ActiveStatus();
