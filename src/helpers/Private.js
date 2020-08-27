import React from "react";
import { Route, Redirect } from "react-router-dom"


const Private = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          return <Component {...props} />
        } else {
          return <Redirect to="/acountmanger" />
        }
      }}
    />
  )
}

export default Private
