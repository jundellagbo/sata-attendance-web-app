import React from "react";
import Button from "@material-ui/core/Button"
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from "prop-types"

const Notif = (props) => {
    const { open, message, onClose } = props
    return (
        <Snackbar 
        anchorOrigin={{vertical: "bottom", horizontal: "left"}} 
        open={open}
        autoHideDuration={6000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={<span id={"message-id"}>{message}</span>}
        action={[
            <Button key="undo" color="secondary" size="small" onClick={onClose}>
                OK
            </Button>
        ]}
        />
    )
}

Notif.propTypes = {
    open: PropTypes.bool,
    message: PropTypes.string,
    onClose: PropTypes.func
}

export default Notif