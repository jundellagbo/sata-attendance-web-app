import React from "react"

import PropTypes from "prop-types"

import Typography from "@material-ui/core/Typography"

const Tpl = ( props ) => {
    const { img, title, children, style } = props
    
    return (
        <div style={styles.center}>
            <div style={styles.content} style={style}>
                <img src={img} style={styles.img} />
                <Typography variant="h5" style={styles.title}>{title}</Typography>
                {children}
            </div>
        </div>
    )
}

Tpl.propTypes = {
    img: PropTypes.any,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string
    ])
}

const styles = {
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: "10%"
    },
    content: {
        maxWidth: "500px"
    },
    title: {
        marginBottom: "10px"
    },
    img: {
        width: "100px",
        marginBottom: "20px"
    }
}

export default Tpl