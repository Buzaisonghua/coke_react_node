import React from 'react'
import { getLogin } from '@src/api/main/login.js'

import { Input, Button, notification } from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { HomeFilled, LockFilled, EyeOutlined, EyeInvisibleOutlined, LoadingOutlined } from '@ant-design/icons';

import styles from './style/from.scss'

export default class LoginFrom extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            svgColor: this.props.svgColor,
            isPwd: true,
            showUserErr: false, // 检查user输入
            showPwdErr: false, 
            user: 'bzsh', // 姓名
            pwd: 'bzsh',
            inLogin: false
        }
    }
    
    render () {
        let {
            user,
            pwd,
            isPwd,
            showUserErr,
            showPwdErr,
            svgColor,
            inLogin
         } = this.state
        const err = {
            userErr: '请输入用户名！',
            pwdErr: '请输入密码！'
        }
        const _changeIsPwd = () => { this.setState({ isPwd: !isPwd }) }
        const _changeUser = (e) => {
            this.setState({ user: e.target.value })
            checkUser(e.target.value)
        }
        const checkUser = (e) => {
            if (e === '') {
                this.setState({ showUserErr: true })
            } else {
                this.setState({ showUserErr: false })
            }
        }
        const _changePwd = (e) => {
            this.setState({ pwd: e.target.value })
            checkPwd(e.target.value)
        }
        const checkPwd = (e) => {
            if (e === '') {
                this.setState({ showPwdErr: true })
            } else {
                this.setState({ showPwdErr: false })
            }
        }
        const checkSumbit = () => {
            return new Promise((resolve, reject) => {
                checkUser(user)
                checkPwd(pwd)
                if (user !== '' && pwd !== '') {
                    resolve('success')
                }
            })
        }
        const loginErr = (title, msg) => {
            notification.open({
                message: title,
                description: msg,
                icon: <ExclamationCircleTwoTone />,
            });
        }
        const _sumbitForm = () => {
            checkSumbit().then(e => {
                if (e === 'success') {
                    this.setState({ inLogin: true })
                    if (user === 'admin') {
                        this.setState({ inLogin: false })
                        this.props.getUser()
                    } else {
                        getLogin(user, pwd).then(res => {
                            this.setState({ inLogin: false })
                            if (res.msg === 'error') {
                                loginErr('登录失败', '服务器异常，刷新重试')
                            } else if (res.msg === 'noUser') {
                                loginErr('登录失败', '请输入正确的用户名')
                            } else if (res.msg === 'noPwd') {
                                loginErr('登录失败', '请输入正确的密码')
                            } else if (res.msg === 'wrong') {
                                loginErr('登录失败', '账号密码错误')
                            } else {
                                this.props.getUser(res.data)
                            }
                        }).catch(e => {
                            this.setState({ inLogin: false })
                            loginErr('登录失败', '服务器异常，刷新重试')
                        })
                    }
                }
            })
        }
        return (
            <div className={styles.login_form}>
                <div className={styles.form_name}>Login Coke</div>
                <div className={styles.login_form_input}>
                    <span className={styles.form_svg}>
                        <HomeFilled style={{ fontSize: '14px', color: svgColor }} />
                    </span>
                    <Input
                        placeholder="Username" 
                        className={styles.form_input}
                        value={user}
                        onChange={_changeUser}
                    />
                    { showUserErr ? <div className={styles.err_input}>{err.userErr}</div> : ''}
                </div>
                <div className={styles.login_form_input}>
                    <span className={styles.form_svg}>
                        <LockFilled style={{ fontSize: '14px', color: svgColor }} />
                    </span>
                    <Input
                        type={isPwd ? 'password' : 'tet'}
                        placeholder="Password"
                        className={styles.form_input}
                        value={pwd}
                        onChange={_changePwd}
                    />
                    <span className={styles.show_pwd} onClick={_changeIsPwd}>
                        {
                            isPwd ?
                                <EyeInvisibleOutlined style={{ fontSize: '16px', color: svgColor }}/> 
                            :
                                <EyeOutlined style={{ fontSize: '16px', color: svgColor }}/>
                        }
                    </span>
                    { showPwdErr ? <div className={styles.err_input}>{err.pwdErr}</div> : ''}
                </div>
                <Button onClick={_sumbitForm} disabled={inLogin} type="primary" className={styles.login_form_button}>
                    {
                        inLogin ? 
                            <LoadingOutlined style={{ fontSize: '16px' }}/>
                        : 
                            'Login'
                    }
                </Button>
                <div className={styles.login_register}>
                    <div className={styles.login_register_left}>
                        <div className={styles.login_register_left_top}>Visitor Login</div>
                        <div className={styles.login_register_left_top}>Username: admin &nbsp;&nbsp;&nbsp;&nbsp; Password: any</div>
                    </div>
                    <Button onClick={() => this.props.changeShowLogin()} type="primary" className={styles.login_register_rigth}>Register</Button>
                </div>
            </div>
        )
    }
}