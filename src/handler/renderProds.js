import { ListProds } from "../components/listProds";

export const RenderProds = () => {
    let type = '';
    let stt = '';
    const renderProds = document.getElementById('renderProds');
    const changeListType = document.querySelectorAll('.changeListType');
    const changeListStatus = document.querySelectorAll('.changeListStatus');
    const checkedType = document.querySelectorAll('span[name="checkedListType"]');
    const checkedStatus = document.querySelectorAll('span[name="checkedListStatus"]');

    const valuetype = (arr, type) => {
        if (arr) {
            Array.from(arr).map(c => {
                c.classList.contains('hidden') ? '' : type = c.dataset.type;
            })
            return type
        }
    }

    const valuestt = (arr, stt) => {
        if (arr) {
            Array.from(arr).map(c => {
                c.classList.contains('hidden') ? '' : stt = c.dataset.stt;
            })
            return stt
        }
    }

    for (let index = 0; index < changeListType.length; index++) {
        const c = changeListType[index];
        const checkType = checkedType[index];
        c.addEventListener('click', () => {
            Array.from(checkedType).map(e => e.classList.add('hidden'))
            Array.from(changeListType).map(e => e.classList.remove('from-orange-500', 'to-amber-400', 'text-white'))

            c.classList.contains('from-orange-500', 'to-amber-400', 'text-white')
                ? c.classList.remove('from-orange-500', 'to-amber-400', 'text-white')
                : c.classList.add('from-orange-500', 'to-amber-400', 'text-white')

            checkType.classList.contains('hidden')
                ? checkType.classList.remove('hidden')
                : checkType.classList.add('hidden')

            ListProds(valuetype(checkedType, type), valuestt(checkedStatus, stt))

        })
    }

    for (let index = 0; index < changeListStatus.length; index++) {
        const c = changeListStatus[index];
        const checkStt = checkedStatus[index]
        c.addEventListener('click', () => {
            Array.from(checkedStatus).map(e => e.classList.add('hidden'));
            Array.from(changeListStatus).map(e => e.classList.remove('from-orange-500', 'to-amber-400', 'text-white'));
            checkStt.classList.toggle('hidden');
            c.classList.toggle('from-orange-500')
            c.classList.toggle('to-amber-400')
            c.classList.toggle('text-white')
            ListProds(valuetype(checkedType, type), valuestt(checkedStatus, stt))
        })
    }
}
