import React from 'react'
import {Route, Redirect, RouteComponentProps} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { StateProps } from '../redux/store'

interface IProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    path?: string | string[];
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
}
const AuthRoute = ({component: Component, ...rest}: IProps) => {
  
    const {authenticated, loading} = useSelector((state: StateProps) => state.users)

    return (
    <Route 
        {...rest}

        render={(props) => loading === false ? (
            authenticated === true 
            ? <Component {...props} />
            : <Redirect to="/login" />
        ) : (
            <Component {...props} />
        )
        }
    />
)}

export default AuthRoute