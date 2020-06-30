import axios from '../axios.js'

export const getLogin = (user, pwd) => new Promise((resolve, reject) => {
    axios('/login/in', 'post', {
        user: user,
        pwd: pwd
    }).then(res => {
        resolve(res)
    }).catch(e => {
        reject()
    })
})

export const getRegister = (user, pwd, oncePwd) => new Promise((resolve, reject) => {
    axios('/login/register', 'post', {
        user: user,
        pwd: pwd,
        oncePwd: oncePwd
    }).then(res => {
        resolve(res)
    }).catch(e => {
        reject()
    })
})