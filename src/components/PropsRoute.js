import React from 'react';
import { Route } from "react-router-dom";

const PropsRoute = ({
    component: Component,
    path,
    ...rest
}) => {

    const render = props => <Component {...props} {...rest} />

    return (
        <Route path={path} render={render} {...rest} />
    );

}

export default PropsRoute;