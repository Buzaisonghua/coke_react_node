import React from 'react'

import styles from '../style/menu_nav.scss'

export default class MenuNav extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            item: this.props.item
        }
    }
    render () {
        const { item } = this.state
        console.log(item)
        return (
            <div className={styles.menu_nav}>
                {
                    item.hasOwnProperty('children') ? 
                        item.children.map((item, index) => {
                            // <MenuNav key={index} item={item}/>
                        })
                    : 
                        <div>{JSON.stringify(item)}</div>
                }
            </div>
        )
    }
}