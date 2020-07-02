import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../style/menu_nav.scss'

export default class MenuNav extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    render () {
        const {
            item,
            navKey
        } = this.props
        return (
            <Link to={ item.path } className={[`${styles.nav_menu}`, `${navKey ? styles.tem_nav : ''}`].join(' ')}>
                { item.name }
                <span className={styles.nav_title}>{ item.title }</span>
            </Link>
        )
    }
}