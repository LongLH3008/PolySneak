import { sendRequest, getData, deleteData, updateData, createData } from '../admin/handleCRUD.js';
const data = await getData('users')

export const AddUser = () => {

    const adduser = document.getElementById('adduser');

    adduser.addEventListener('submit', (e) => {
        e.preventDefault()
        const user = document.querySelector('input[name="user"]').value;
        const pass = document.querySelector('input[name="pass"]').value;
        const repass = document.querySelector('input[name="repass"]').value;
        const rule = document.querySelector('select[name="rule"]').value;
        console.log(rule);
        let check = "Success";

        let adduser = {
            id: '',
            username: user,
            password: pass,
            rule: rule,
            cart: []
        }

        data.forEach(dt => {
            if (dt.username == user) {
                check = 'Email already exist !\n';
            }
        });

        if (pass !== repass) check = 'Password not match !';
        if (rule == '') check = 'Please Choose Rule !';
        if (check == 'Success') {
            createData(adduser, 'users');
            window.location.href = '/admin/users';
        }   
        alert(check)
    })

}

export const changeRules = () => {
    const dataid = data.map(dt => dt.id);
    dataid.map(e => {
        let newData = data.find(dt => dt.id === e);
        let formRule = document.getElementById(`changeRule_user${e}`)
        let change = formRule.querySelector('span[name="change"]');
        let rule = formRule.querySelector('span[name="rule"]');
        let setRule = formRule.querySelector('select[name="setRule"]');
        let saveRule = formRule.querySelector('span[name="saveRule"]')
        change.addEventListener('click', () => {
            rule.classList.toggle('hidden');
            change.classList.toggle('hidden');
            setRule.classList.toggle('hidden');
            saveRule.classList.toggle('hidden');
        })

        saveRule.addEventListener('click', () => {
            newData.rule = setRule.value
            rule.classList.toggle('hidden');
            change.classList.toggle('hidden');
            setRule.classList.toggle('hidden');
            saveRule.classList.toggle('hidden');
            updateData(e, newData, 'users');
            // window.location.href = '/admin/users';
        })

    })
}

export const deleteUser = () => {
    const dataid = data.map(dt => dt.id);   
    dataid.map(e => {
        console.log(e);
        const del = document.querySelector(`#delete_user${e}`);
        del.addEventListener('click', () => deleteData(e, 'users'))
    })
}