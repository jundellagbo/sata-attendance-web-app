import React from "react"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Loader from "./Loader"
import PropTypes from "prop-types"

const Modal = (props) => {

    const { open, title, children, actions, size, loading } = props

    return (
        <Dialog
        open={open}
        aria-labelledby="max-width-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={size}
        scroll={"body"}
        >
        <Loader loading={loading}/>
        <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
        <DialogContent style={{ flex: 1 }}>
            {children}
        </DialogContent>
        {
            actions ? (
            <DialogActions>
                {
                    actions.map((row, index) => {
                        return (
                            <Button 
                            size={row.size}
                            variant={row.variant} 
                            key={index} 
                            onClick={row.exec} 
                            color={row.color}
                            style={row.style}
                            >{row.text}</Button>
                        )
                    })
                }
            </DialogActions>
            ) : (<div />)
        }
        </Dialog>
    )
}

Modal.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string
    ]),
    actions: PropTypes.array,
    loading: PropTypes.bool
}

export default Modal;