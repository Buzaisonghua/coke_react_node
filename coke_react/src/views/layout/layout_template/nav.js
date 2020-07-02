import React from 'react'
import styles from '../style/nav_main.scss'

import MenuNav from './menuNav.js'
import { withRouter } from 'react-router-dom';

class NavMain extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            navKey: 0,
            layoutRouter: [
                {
                    name: 'Home',
                    title: '首页',
                    path: '/layout/home'
                },
                {
                    name: 'Document',
                    title: '文档',
                    path: '/layout/documentaction'
                },
                {
                    name: 'Menu',
                    title: '路由',
                    path: '/layout/menu'
                },
                {
                    name: 'Echarts',
                    title: '图表',
                    path: '/layout/echarts'
                }
            ]
        }
    }
    render () {
        const {
            layoutRouter
        } = this.state
        const location = this.props.location.pathname
        return (
           <div className={styles.nav_box}>
               {
                   layoutRouter.map((item, index) => (
                        <MenuNav
                            navKey={ location === item.path }
                            changeRouter={() => this._changeRouter()}
                            item={item}
                            key={ index }
                        />)
                    )
               }
           </div>
        )
    }
    _changeRouter() {}
}

export default withRouter(NavMain)
