import React from "react"
import PropTypes from "prop-types"
import Buttonicon from "./Buttonicon"
import InputAdornment from "@material-ui/core/InputAdornment"

const InputIcon = (props) =>  {
    const { position, onClick, children, tooltip } = props
    return (
        <InputAdornment position={position}>
            <Buttonicon tooltip={tooltip} onClick={ onClick }>
                {children}
            </Buttonicon>
        </InputAdornment>
    )
}

InputIcon.propTypes = {
    position: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.element,
    tooltip: PropTypes.string
}

export default (InputIcon)