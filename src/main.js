import Navigo from "navigo";
import HomePage from "./pages/home";
import DetailProductPage from "./pages/details_product";
import ContactPage from "./pages/contact";
import ErrorPage from "./pages/404_notfound";
import ListProductPage from "./pages/list_product";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";
import { products } from '../db.json';
import { users } from '../db.json'

const { attribute } = products
const render = (container, components) => document.querySelector(container).innerHTML = components

const router = new Navigo('/', { linkSelector: 'a' });

router.on('/', () => render('#app', HomePage()));

router.on('/signin', () => render('#app', SigninPage()));

router.on('/signup', () => {
  render('#app', SignupPage());
  const signup = document.getElementById('signup');
  signup.addEventListener('submit', function () {
    const username = document.getElementById('signupEmail').value;
    const pass = document.getElementById('signupPass').value;
    const repass = document.getElementById('repass').value;
    if (pass === repass) {
      alert('Success');
      localStorage.setItem('user', username);
      const newUser = {
        id: 1,
        email: username,
        pass: pass
      }
      users.push(newUser);
      console.log(users);
    } else {
      alert('Passwords do not match');
    }
  })
  console.log(users);
  console.log(localStorage.getItem('user'));

})

router.on('/contact', () => render('#app', ContactPage()));
router.on('/product', () => render('#app', ListProductPage()));

router.on('/detailproduct/:id', ({ data }) => {
  render('#app', DetailProductPage(data.id));

  const colorValue = document.getElementById('colorValue').values;
  const colorBtn = document.querySelectorAll('.chooseColor');
  const img = document.getElementById('imgProduct')

  const changeColorProduct = (arrColorBtn, inputValue, imgProd) => {
    const colorBtn = [...arrColorBtn]
    colorBtn.map(e => {
      e.addEventListener('click', () => {
        colorBtn.map(el => el.classList.remove('border-orange-500'))
        e.classList.add('border-orange-500');
        inputValue = e.dataset.color;
        imgProd.src = e.dataset.img;
        console.log(e.dataset.img);
      })
    })
  }
  changeColorProduct(colorBtn, colorValue, img)

  // ----------------------------------------------------------------

  const sizeValue = document.getElementById('sizeValue').values;
  const sizeBtn = document.querySelectorAll('.chooseSize');

  const changeSizeProduct = (arrSizeBtn, inputValue) => {
    const colorBtn = [...arrSizeBtn]
    colorBtn.map(e => {
      e.addEventListener('click', () => {
        colorBtn.map(el => el.classList.remove('border-orange-500'))
        inputValue = e.innerText.toLowerCase();
        e.classList.add('border-orange-500');
        console.log(inputValue);
      })
    })
  }
  changeSizeProduct(sizeBtn, sizeValue)

  // ----------------------------------------------------------------

  const minus = document.getElementById('minus');
  const plus = document.getElementById('plus');
  const amountInput = document.getElementById('amount');

  minus.addEventListener('click', () => {
    let amount = parseInt(amountInput.value)
    if (amount > 1) {
      amount = amount - 1;
      amountInput.value = amount;
    }
  });

  plus.addEventListener('click', () => {
    let amount = parseInt(amountInput.value)
    if (amount < 5) {
      amount = amount + 1;
      amountInput.value = amount;
    }
  });
})

router.notFound = () => render('#app', ErrorPage())

router.resolve();
