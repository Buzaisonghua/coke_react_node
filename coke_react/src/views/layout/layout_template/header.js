import React from 'react'
import { Row, Col } from 'antd';

import styles from '../style/header_main.scss'
import logo from '@src/image/logo.png'

export default class HeaderMain extends React.Component {
    render () {
        return (
            <Row className={styles.header_main_box}>
                <Col
                    className={styles.header_logo}
                    xs={24}
                    sm={24}
                    md={6}
                    lg={6}
                    xl={5}
                    xxl={4}
                >
                        <img className={styles.logo_image} src={logo} alt="logo" title="logo"/>
                        COKE
                </Col>
                <Col
                    className={styles.header_users}
                    xs={0}
                    sm={0}
                    md={18}
                    lg={18}
                    xl={19}
                    xxl={20}>
                        <span onClick={() => this._unLogin()} className={styles.header_users_unlogin}>退出登录</span>
                </Col>
            </Row>
        )
    }
    _unLogin () {
        this.props._unLogin()
    }
}