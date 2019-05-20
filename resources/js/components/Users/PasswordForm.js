import React from "react"
import PropTypes from "prop-types"
import Input from "./../Input"
import InputIcon from "./../../components/InputIcon"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Visibility from "@material-ui/icons/Visibility"

class PasswordForm extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            _new: true,
            _confirm: true
        }
    }
    render() {

        const { _new, _confirm } = this.state

        const { passwInputChange, password, confirm } = this.props

        return (
            <div>
            <Input 
            value={password}
            label={"New Password"}
            type={_new ? "password" : "text"}
            onChange={(e) => passwInputChange(e)}
            name={"newPassword"}
            icon={{
                endAdornment: (
                    <InputIcon 
                    position={"end"}
                    tooltip={_new ? "Hide Password" : "Show Password"}
                    onClick={() => this.setState({ _new: !_new })}
                    >
                        { _new ? (<Visibility />) : (<VisibilityOff/>) }
                    </InputIcon>
                )
            }}
            />

            {
                confirm.init ? (
                    <Input 
                    value={confirm.value}
                    label={"Confirm New Password"}
                    type={_confirm ? "password" : "text"}
                    onChange={(e) => passwInputChange(e)}
                    name={"confirmPassword"}
                    icon={{
                        endAdornment: (
                            <InputIcon 
                            position={"end"}
                            tooltip={_confirm ? "Hide Password" : "Show Password"}
                            onClick={() => this.setState({ _confirm: !_confirm })}
                            >
                                { _confirm ? (<Visibility />) : (<VisibilityOff/>) }
                            </InputIcon>
                        )
                    }}
                    />
                ) : null
            }
            </div>
        )
    }
}
PasswordForm.propTypes = {
    passwInputChange: PropTypes.func,
    confirm: PropTypes.object
}
export default PasswordForm