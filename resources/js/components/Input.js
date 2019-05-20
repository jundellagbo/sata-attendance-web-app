import React from "react"
import { compose } from "redux"
import { withStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"

import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"

const Input = ( props ) => {
    const { value, label, name, type, onChange, error, icon, error_response, classes, disabled } = props
    return (
        <FormControl fullWidth className={classes.input}>
            <TextField 
            value={value}
            label={label}
            name={name}
            type={type}
            autoComplete={"false"}
            margin={"dense"}
            variant={"outlined"}
            autoComplete={"off"}
            error={error}
            onChange={(e) => onChange(e)}
            InputProps={icon}
            disabled={disabled}
            />
            {
                !error ? null :
                (
                    <Typography component={"span"} className={classes.invalid}>
                        {error_response}
                    </Typography>
                )
            }
        </FormControl>
    )
}


Input.propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    error: PropTypes.bool,
    onChange: PropTypes.func,
    icon: PropTypes.any,
    error_response: PropTypes.string,
    classes: PropTypes.object,
    disabled: PropTypes.bool
}

const styles = theme => ({
    input: {
        marginTop: "10px"
    },
    invalid: {
        color: "#f44336",
        fontSize: "11px"
    },
})

export default compose(
withStyles( styles )
) ( Input )