import React from 'react'
import { Row, Col } from 'antd';
import styles from './style/index.scss'
import NavMain from './layout_template/nav.js'
import HeaderMain from './layout_template/header.js'
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable'

import Home from '@src/views/work/home/index.js'
function Loading() {
    return 'Loading....'
}
const DocumentAction = Loadable({
    loader: () => import('@src/views/work/documentaction/index.js'),
    loading: Loading,
})
const Menu = Loadable({
    loader: () => import('@src/views/work/menu/index.js'),
    loading: Loading,
})
const Echarts = Loadable({
    loader: () => import('@src/views/work/echarts/index.js'),
    loading: Loading,
})
export default class Layout extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isNav: false
        }
    }
    render () {
        const { isNav } = this.state
        return (
            <div className={styles.layout}>
                <header className={styles.layout_header}>
                    <HeaderMain _unLogin={ () => this._unLogin() }/>
                </header>
                <Row className={styles.layout_main_box}>
                    {/* 响应式后的遮罩层 */}
                    <div onClick={() => this._changeIsNav()} className={ `${isNav ? styles.open_share: ''}`}/>
                    {/* 右侧导航 */}
                    <Col
                        lg={6}
                        xl={5}
                        xxl={4}
                        className={[`${styles.layout_nav}`, `${isNav ? styles.open_nav : styles.close_nav}`].join(' ')}
                    >
                        <NavMain changeNav={ _ => this._changeNav }/>
                        <div className={styles.change_nav} onClick={() => this._changeIsNav()}>
                            {
                                isNav ? 
                                    <span className={styles.nav_open_svg}/>
                                :
                                    <span className={styles.nav_close_svg} />
                            }
                        </div>
                    </Col>
                    <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={18}
                        xl={19}
                        xxl={20}
                        className={styles.layout_main}
                    >
                        <Switch>
                            <Route exact path="/layout/" component={Home}></Route>
                            <Route path="/layout/home" component={Home}></Route>
                            <Route path="/layout/documentaction" component={ DocumentAction }/>
                            <Route path="/layout/menu" component={Menu}></Route>
                            <Route path="/layout/echarts" component={Echarts}></Route>
                        </Switch>
                    </Col>
                </Row>
            </div>
        )
       
    }
    _changeIsNav () {
        this.setState({ isNav: !this.state.isNav })
    }
    _unLogin () {
        localStorage.users = null
        this.props.history.push('/login')
    }
}