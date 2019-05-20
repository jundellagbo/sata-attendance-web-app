import React from "react"
import PropTypes from "prop-types"
const Content = ( props ) => {
    const { children } = props 
    return (
        <div style={style.content}>
            <div style={style.wrap}>
            { children }
            </div>
        </div>
    )
}
const style = {
    content: {
        margin: "100px 20px 50px 20px"
    },
    wrap: {
        maxWidth: "1000px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "20px"
    },
}
Content.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ])
}
export default Content