import React from 'react'
import { Input, Button, notification } from 'antd';
// import { HomeFilled, LockFilled, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { HomeFilled, LockFilled, SnippetsFilled, ExclamationCircleTwoTone, LoadingOutlined} from '@ant-design/icons';
import { getRegister } from '@src/api/main/login.js'
import styles from './style/from.scss'


export default class LoginRegister extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            svgColor: this.props.svgColor,
            user: '', // 姓名
            pwd: '',
            oncePwd: '',
            showUserErr: false,
            showPwdErr: false,
            showOncePwdErr: false,
            oncePwdErrVal: '请再次输入密码！',
            inRegister: false
        }
    }

    render () {
        const {
            svgColor,
            user,
            pwd,
            oncePwd,
            showUserErr,
            showPwdErr,
            showOncePwdErr,
            inRegister
        } = this.state
        const err = {
            userErr: '请输入用户名！',
            pwdErr: '请输入密码！',
            oncePwdErr: this.state.oncePwdErrVal
        }
        return (
            <div
                className={styles.login_form}
            >
                <div className={styles.form_name}>Register Coke</div>
                <div className={styles.login_form_input}
                >
                    <span className={styles.form_svg}>
                        <HomeFilled style={{ fontSize: '14px', color: svgColor }} />
                    </span>
                    <Input
                        placeholder="请输入用户名" 
                        className={styles.form_input}
                        value={ user }
                        onChange={(e) => this._changeUser(e)}
                    />
                    { showUserErr ? <div className={styles.err_input}>{err.userErr}</div> : ''}
                </div>
                <div className={styles.login_form_input}>
                    <span className={styles.form_svg}>
                        <LockFilled style={{ fontSize: '14px', color: svgColor }} />
                    </span>
                    <Input
                        placeholder="请输入密码" 
                        className={styles.form_input}
                        value={ pwd }
                        onChange={(e) => this._changePwd(e)}
                    />
                    { showPwdErr ? <div className={styles.err_input}>{err.pwdErr}</div> : ''}
                </div>
                <div className={styles.login_form_input}>
                    <span className={styles.form_svg}>
                        <SnippetsFilled style={{ fontSize: '14px', color: svgColor }} />
                    </span>
                    <Input
                        placeholder="请再次输入密码" 
                        className={styles.form_input}
                        value={ oncePwd }
                        onChange={(e) => this._changeOncePwd(e)}
                    />
                    { showOncePwdErr ? <div className={styles.err_input}>{err.oncePwdErr}</div> : ''}
                </div>
                <Button onClick={() => {this._registerSumbit()}} type="primary" className={styles.login_form_button}>
                    {
                        inRegister ? 
                            <LoadingOutlined style={{ fontSize: '16px' }}/>
                        :
                            'Register'
                    }
                    
                </Button>
                <div className={styles.login_register}>
                    <div className={styles.login_register_left}>
                        <div className={styles.login_register_left_top}>Github访问未连接服务器</div>
                        <div className={styles.login_register_left_top}>会报服务器异常错误</div>
                    </div>
                    <Button onClick={() => this.props.changeShowLogin()} type="primary" className={styles.login_register_rigth}>Login</Button>
                </div>
            </div>
        )
    }
    _changeUser = (e) => {
        this.setState({ user: e.target.value })
        this.checkUser(e.target.value)
    }
    checkUser = (e) => {
        if (e === '') {
            this.setState({ showUserErr: true })
        } else {
            this.setState({ showUserErr: false })
        }
    }
    _changePwd (e) {
        this.setState({ pwd: e.target.value })
        this.checkPwd(e.target.value)
    }
    checkPwd = (e) => {
        if (e === '') {
            this.setState({ showPwdErr: true })
        } else {
            this.setState({ showPwdErr: false })
        }
    }
    _changeOncePwd(e) {
        this.setState({ oncePwd: e.target.value })
        this.checkOncePwd(e.target.value)
    }
    checkOncePwd = (e) => {
        if (e === '' || e !== this.state.pwd) {
            this.setState({ showOncePwdErr: true })
            if (e === '') {
                this.setState({ oncePwdErrVal: '请再次输入密码！' })
            } else {
                this.setState({ oncePwdErrVal: '两次密码输入不一致！' })
            }
        } else {
            this.setState({ showOncePwdErr: false })
        }
    }
    checkSumbit () {
        return new Promise((resolve, reject) => {
            this.checkUser(this.state.user)
            this.checkPwd(this.state.pwd)
            this.checkOncePwd(this.state.oncePwd)
            if (!(this.state.user === '' || this.state.pwd === '' || this.state.oncePwd === '' || this.state.pwd !== this.state.oncePwd)) {
                resolve('success')
            }
        })
    }
    loginErr = (title, msg) => {
        notification.open({
            message: title,
            description: msg,
            icon: <ExclamationCircleTwoTone />,
        });
    }
    _registerSumbit () {
        this.checkSumbit().then(res => {
            if (res === 'success') {
                this.setState({ inRegister: true })
                getRegister(this.state.user, this.state.pwd, this.state.oncePwd).then(res => {
                    this.setState({ inRegister: false })
                    if (res.msg === 'error') {
                        this.loginErr('注册失败', '服务器异常，刷新重试')
                    } else if (res.msg === 'noUser') {
                        this.loginErr('注册失败', '用户名重复')
                    } else if (res.msg === 'noPwd') {
                        this.loginErr('注册失败', '请输入正确的密码')
                    } else if (res.msg === 'pwd') {
                        this.loginErr('注册失败', '两次密码输入不一致')
                    } else if (res.msg === 'success') {
                        this.props.getUser(res.data)
                    }
                }).catch(e => {
                    this.setState({ inRegister: true })
                    this.loginErr('注册失败', '服务器异常，刷新重试')
                })
            }
         })

    }
}