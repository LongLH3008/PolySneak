const SignInHandler = () => {
    const api = 'http://localhost:3000/users';

    function signin() {
        getDataUser(handleSignin);
        // alert('signin');
    }

    function getDataUser(callback) {
        fetch(api)
            .then(function (response) { return response.json() })
            .then(callback)
    }

    function handleSignin(data) {
        console.log(data);
        let username = document.getElementById('username').value;
        console.log(username);
        let password = document.getElementById('password').value;
        console.log(password);
        let check = ''
        data.forEach(dt => {
            if (dt.username == username) {
                check = dt.password == password ? 'Welcome' : 'Wrong Password';
            }else {
                check = 'Email/Username does not exist'
            }
        });

        console.log(check);

        if (check == 'Welcome') {
            const user = {
                id: '',
                username: username,
            }
            localStorage.setItem('user', JSON.stringify(user));
            // alert(check)
            window.location.href = '/'
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