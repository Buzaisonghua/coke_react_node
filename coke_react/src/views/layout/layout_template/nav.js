import React from 'react'
// import { HomeFilled, StarFilled,TagsFilled } from '@ant-design/icons'

// import MenuNav from './menuNav.js'

import styles from '../style/nav_main.scss'

// PagesData.PropTypes = {
//     routers: PropTypes.Array 
// }

export default class NavMain extends React.Component{
    // constructor (props) {
    //     super(props)
        // this.state = {
        //     routers: this.props.routers
        // }
    // }
    render () {
        // const {
        //     routers
        // } = this.state
        // console.log(this.state.routers)
        return (
            <div className={styles.nav}>
               <div className={styles.nav_box}>
                   1
                    {/* {
                        routers.map((item, index) => 
                            <MenuNav key={index} item={item}/>
                        ) */}
                    {/* } */}
               </div>
            </div>
        )
    }
    
}
