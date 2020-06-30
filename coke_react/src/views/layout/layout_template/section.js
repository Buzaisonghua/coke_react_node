import React from 'react'
// import { Switch, Route } from 'react-router-dom'

// import styles from '../style/section_main.scss'

// import Home from '@src/views/work/home/index.js'
// import Layout from '@src/views/layout/index.js'
// import DocumentAction from '@src/views/work/documentaction/index.js'

export default class SectionMain extends React.Component {
    render () {
        // const { routers } = this.state
        const { children } = this.props
        return (
            
            { children }
            // <Switch>
            //     <Route path="/" component={Layout}>
            //         <Route path='home' component={Home}/>
            //     </Route>
            //     {/* { */}
            //         {/* routers.map((items, index ) => ( */}
                        
            //         {/* ))
            //     } */}
                
            // </Switch>
        )
    }
}