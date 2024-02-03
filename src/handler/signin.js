const SignInHandler = () => {
    const api = 'http://localhost:3000/users';

    function signin() {
        getDataUser(handleSignin);
    }

    function getDataUser(callback) {
        fetch(api)
            .then(function (response) { return response.json() })
            .then(callback)
    }

    function handleSignin(data) {
        console.log(data);
        let user = document.getElementById('username').value;
        console.log(user);
        let pass = document.getElementById('password').value;
        console.log(pass);
        let check = 'Email/Username does not exist'

        data.map(dt => {
            if (dt.username == user) {
                check = dt.password == pass ? 'Welcome' : 'Wrong Password';
            }
        });

        console.log(check);

        if (check == 'Welcome') {
            const userActive = {
                username: user,
            }
            localStorage.setItem('user', JSON.stringify(userActive));
            window.location.href = '/';
        }
        alert(check)
    }

    const signinForm = document.getElementById('signin');
    signinForm.addEventListener('submit', function (e) {
        e.preventDefault();
        signin()
    })
}

export default SignInHandler