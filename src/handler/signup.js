import { v4 as uuidv4 } from 'uuid';
import { createData } from '../admin/handleCRUD';
import md5 from 'md5';

const SignUpHandler = () => {
    const api = 'http://localhost:3000/users';

    function signup() {
        getDataUser(handleSignup);
        // alert('Signup');
    }

    function getDataUser(callback) {
        fetch(api)
            .then(response => response.json())
            .then(callback)
            .catch(error => console.error('Error fetching data:', error));
    }

    function addNewUser(user) {
        fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .catch(error => console.error('Error adding new user:', error));
    }

    function handleSignup(data) {
        let usernameSignup = document.getElementById('usernameSignup').value;
        let passwordSignup = document.getElementById('passwordSignup').value;
        let repassword = document.getElementById('repassword').value;
        let err = '';
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(passwordSignup)) {
            alert('At least one lower / upper / number/ symbor');
            return;
        }

        let adduser = {
            id: uuidv4(),
            username: usernameSignup,
            password: md5(passwordSignup),
            rule: 'customer',
            cart: []
        }

        data.forEach(dt => {
            if (dt.username == usernameSignup) {
                err = 'Email already exist !\n';
            }
        });

        if (passwordSignup !== repassword) {
            err += 'Password not match !';
        }

        if (err === '') {
            alert('Signup success')
            // addNewUser(adduser);
            createData(adduser, 'users');
            window.location.href = '/signin'
        } else {
            alert(err);
        }
    }

    const signupForm = document.getElementById('signup');
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        signup()
    })
}
export default SignUpHandler