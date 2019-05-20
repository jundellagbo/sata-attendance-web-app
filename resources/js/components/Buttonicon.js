import React from "react"
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import PropTypes from "prop-types"

const ButtonIcon = (props) => {
    const { onClick, className, color, tooltip, children, style } = props
    return (
        <Tooltip title={tooltip}>
        <IconButton
        color={color}
        className={className}
        onClick={onClick}
        style={style}
        >
        {children}
        </IconButton>
        </Tooltip>
    )
}

ButtonIcon.propTypes = {
    className: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    onClick: PropTypes.func,
    color: PropTypes.string,
    tooltip: PropTypes.string,
    children: PropTypes.element,
    style: PropTypes.object
}

export default ButtonIcon