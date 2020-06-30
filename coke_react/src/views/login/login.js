import React from 'react'
import LoginFrom from './loginFrom'
import LoginRegister from "./loginRegister";

import styles from './style/login.scss'

export default class Login extends React.Component {
    constructor () {
        super()
        this.state = {
            showLogin: true,
            svgColor: '#889aa4'
        }
    }
    render () {
        let { showLogin, svgColor } = this.state
        return (
            <div className={styles.login}>
                <div className={showLogin ? styles.showViewAnim : styles.noneViewAnim}>
                    <LoginFrom getUser={this._getUser} changeShowLogin={this._changeShowLogin} svgColor={svgColor}/>
                </div>
                <div className={!showLogin ? styles.showViewAnim : styles.noneViewAnim}>
                    <LoginRegister getUser={this._getUser} changeShowLogin={this._changeShowLogin} svgColor={svgColor}/>
                </div>
            </div>
        )
    }
    _changeShowLogin = () => {
        this.setState({ 
            showLogin: !this.state.showLogin
         })
    }
    _getUser = (e = {username: 'admin', id: 1}) => {
        localStorage.users = e
        this.props.history.push('/layout')
    }
}