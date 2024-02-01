import Navigo from "navigo";
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

const render = (container, components) => document.querySelector(container).innerHTML = components

const router = new Navigo('/', { linkSelector: 'a' });

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

router.notFound = () => render('#app', ErrorPage())

router.resolve();

ActiveStatus();
