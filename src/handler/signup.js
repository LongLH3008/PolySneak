const SignUpHandler = () => {
    const api = 'http://localhost:3000/users';

    function signup() {
        getDataUser(handleSignup);
        // alert('Signup');
    }

    function getDataUser(callback) {
        fetch(api)
            .then(function (response) { return response.json() })
            .then(callback)
    }

    function addNewUser(user) {
        fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then(function (response) {
                return response.json();
            })
    }

    function handleSignup(data) {
        let usernameSignup = document.getElementById('usernameSignup').value;
        let passwordSignup = document.getElementById('passwordSignup').value;
        let repassword = document.getElementById('repassword').value;
        let err = false;

        let user = {
            id: '',
            username: usernameSignup,
            password: passwordSignup
        }

        data.forEach(dt => {
            if (dt.username == usernameSignup) {
                alert('Email already exist');
                err = true
            }
        });

        if (passwordSignup !== repassword) {
            alert('Password not match !');
            err = true
        }

        if (err === false) {
            alert('Signup success')
            addNewUser(user);
            router.navigate('/signin');
        }
    }

    const signupForm = document.getElementById('signup');
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        signup()
    })
}
export default SignUpHandler