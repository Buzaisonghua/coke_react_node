import React from 'react'
import { Row, Col } from 'antd';

import styles from './style/index.scss'

import NavMain from './layout_template/nav.js'
// import SectionMain from './layout_template/section.js'
import HeaderMain from './layout_template/header.js'

export default class Layout extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isNav: false,
            routers: [
                {
                    path: 'home', // 首页
                    name: 'Home',
                    title: 'Home',
                    icon: 'HomeFilled',
                    component: () => import('@src/views/work/home/index.js')
                },
                {
                    path: 'documentaction', // 编辑也
                    name: 'Documentaction',
                    title: 'Documentaction',
                    icon: 'StarFilled',
                    component: () => import('@src/views/work/documentaction/index.js')
                }
                // {
                //     path: '/nested', // 路由页
                //     name: 'Nested',
                //     title: 'Nested Router',
                //     icon: 'TagsFilled',
                //     children: [
                //         {
                //             path: '/menu1', // 路由页
                //             name: 'Menu1',
                //             title: 'Menu1',
                //         }
                //     ]    
                // }
            ]
        }
    }
    render () {
        console.log()
        const { isNav } = this.state
        return (
            <div className={styles.layout}>
                <header className={styles.layout_header}>
                    <HeaderMain />
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
                        <NavMain/>
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
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        )
       
    }
    _changeIsNav () {
        this.setState({ isNav: !this.state.isNav })
    }
}