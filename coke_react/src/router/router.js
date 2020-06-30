import React from 'react'
import { Switch , Route, BrowserRouter } from 'react-router-dom'

// 路由
import Login from '@src/views/login/login.js'
import Layout from '@src/views/layout/index.js'

import Home from '@src/views/work/home/index.js'
import DocumentAction from '@src/views/work/documentaction/index.js'


export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/login" exact component={Login}/>
            <Layout>
                <Route path='/home' component={Home}/>
                <Route path="/documentaction" component={DocumentAction}/>
            </Layout>
        </Switch>
    </BrowserRouter> 
)


// export default class MainRouter extends Component {
//     constructor (props) {
//         super(props)
//         this.state = {
//             // haveLogin: localStorage.users
//         }
//     }
    // render () {
        // const { haveLogin } = this.state
//         return (
//             <BrowserRouter>
//                 <Route path='/' exact component={Login}/>
//                 <Route path='/layout' component={Layout} />
//             </BrowserRouter>      
//         )
//     }
// }
