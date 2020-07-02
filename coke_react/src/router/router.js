import React from 'react'
import { Switch , Route, BrowserRouter} from 'react-router-dom'

// 路由
import Login from '@src/views/login/login.js'
import Layout from '@src/views/layout/index.js'

export default () => (
    <BrowserRouter>
        <Switch>
            {
                localStorage.users ? 
                    <Route path="/" exact component={Login}/>
                : 
                    <Route path="/" exact component={Layout}/>
            }
            <Route path="/login" component={Login}/>
            <Route path="/layout" component={Layout}></Route>
        </Switch>
    </BrowserRouter> 
)
