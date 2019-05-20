import React from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { compose } from "redux"
import Button from "@material-ui/core/Button"
const Link = ( props ) => {
    return (
        <Button style={{ lineHeight: "unset", backgroundColor: "transparent", padding: 0, textTransform: "none", color: "#2196f3", minWidth: "unset", minHeight: "unset" }} onClick={() => props.history.push(props.href)}>{props.title}</Button>
    )
}
Link.propTypes = {
    href: PropTypes.string,
    title: PropTypes.string
}
export default compose(
    withRouter
) ( Link )