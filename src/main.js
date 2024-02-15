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
import HomeAdminPage from "./adminPages/home.js";
import ProductsAdminPage from "./adminPages/products.js";
import { render, router } from "../utils/index.js";
import UsersAdminPage from "./adminPages/users.js";
import addUser from "./adminPages/addUser.js";
import { AddUser, changeRules, deleteUser } from "./handler/user.js";
import CartPage from "./pages/cart.js";
import { DetailProdAddToCart, HomeAddToCart, ListProdAddToCart, changeAmount, chooseToOrder, removeProductFromCart } from "./handler/cart.js";
import { RenderProds } from "./handler/renderProds.js";
import { editProd, updateProd } from "./admin/updateProd.js";
import EditProdPage from "./adminPages/editProd.js";
import addProduct from "./adminPages/addproduct.js";
import { handleAddProd } from "./admin/addprod.js";

// handleSearchBox();

router.on('/', () => {
  render('#app', HomePage());
  HomeAddToCart();
  ActiveStatus();
});

router.on('/contact', () => {
  render('#app', ContactPage())
  ActiveStatus();
});

router.on('/product', () => {
  render('#app', ListProductPage())
  ListProdAddToCart();
  RenderProds();
  ActiveStatus();
});

router.on('/detailproduct/:id', ({ data }) => {
  render('#app', DetailProductPage(data.id));
  DetailProductHandler(data.id);
  ActiveStatus();
  DetailProdAddToCart(data.id)
})


router.on('/cart', () => {
  render('#app', CartPage())
  changeAmount();
  removeProductFromCart();
  chooseToOrder();
  ActiveStatus();
});

router.on('/signin', () => {
  render('#app', SigninPage());
  SignInHandler();
})

router.on('/signup', () => {
  render('#app', SignupPage());
  SignUpHandler();
})

router.on('/signout', () => {
  localStorage.clear();
  alert('See you again !')
  window.location.href = '/';
});

router.on('/admin', () => render('#app', HomeAdminPage()));

router.on('/admin/products', () => {
  render('#app', ProductsAdminPage())
  updateProd();
});

router.on('/admin/editprod/:id', ({ data }) => {
  render('#app', EditProdPage(data.id));
  editProd(data.id);
})

router.on('/admin/addProduct', () => {
  render('#app', addProduct());
  handleAddProd();
})

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