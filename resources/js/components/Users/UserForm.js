import React from "react"
import PropTypes from "prop-types"

import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Visibility from "@material-ui/icons/Visibility"
import Mail from "@material-ui/icons/Mail"
import Person from "@material-ui/icons/Person"

import InputIcon from "./../InputIcon"
import Input from "./../Input"
import Grid from "@material-ui/core/Grid"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl  from '@material-ui/core/FormControl';

import { compose } from "redux"

class UserForm extends React.Component {
    constructor() {
        super()
        this.state = {
            showPassword: true
        }
    }

    render() {
        const { showPassword } = this.state
        const { handleChangeInput, dataSource, showData, isAdmin, showAdminOption } = this.props
        const { input } = dataSource 
        const edit = input.id == 0 ? false : true
        return (
            <div>
                <Typography paragraph>please fill out the form below.</Typography>
                <form style={{ flex: 1 }}>
                <Grid container spacing={16}>
                    <Grid item lg={6}>

                        <Input 
                        value={input.firstname}
                        label={"Firstname"}
                        type={"text"}
                        onChange={(e) => handleChangeInput(e)}
                        name={"firstname"}
                        />

                        <Input 
                        value={input.middlename}
                        label={"Middlename"}
                        type={"text"}
                        onChange={(e) => handleChangeInput(e)}
                        name={"middlename"}
                        />

                        <Input 
                        value={input.lastname}
                        label={"Lastname"}
                        type={"text"}
                        onChange={(e) => handleChangeInput(e)}
                        name={"lastname"}
                        />

                        <Input 
                        value={input.contact}
                        label={"Contact Number"}
                        type={"text"}
                        onChange={(e) => handleChangeInput(e)}
                        name={"contact"}
                        />

                    </Grid>
                    <Grid item lg={6}>
                        <Input 
                        value={input.username}
                        label={"Username"}
                        type={"text"}
                        onChange={(e) => handleChangeInput(e)}
                        name={"username"}
                        disabled={edit ? true: false}
                        icon={edit ? {
                            endAdornment: (
                                <InputIcon 
                                position={"end"}
                                tooltip={"username"}
                                onClick={() => showData(input.username)}
                                >
                                    <Person />
                                </InputIcon>
                            )
                        } : null}
                        />
                        <Input 
                        value={input.email}
                        label={"Email"}
                        type={"email"}
                        onChange={(e) => handleChangeInput(e)}
                        name={"email"}
                        disabled={edit ? true: false}
                        icon={edit ? {
                            endAdornment: (
                                <InputIcon 
                                position={"end"}
                                tooltip={"Email"}
                                onClick={() => showData(input.email)}
                                >
                                    <Mail />
                                </InputIcon>
                            )
                        } : null}
                        />
                        
                        { !edit ? (
                        <Input 
                        value={input.password}
                        label={"Password"}
                        type={showPassword ? "password" : "text"}
                        onChange={(e) => handleChangeInput(e)}
                        name={"password"}
                        icon={{
                            endAdornment: (
                                <InputIcon 
                                position={"end"}
                                tooltip={showPassword ? "Hide Password" : "Show Password"}
                                onClick={() => this.setState({ showPassword: !showPassword })}
                                >
                                    {showPassword ? (<Visibility />) : (<VisibilityOff />) }
                                </InputIcon>
                            )
                        }}
                        />
                        ) : null }
            
                        { showAdminOption ? (
                            <Typography paragraph style={{ marginTop: 15 }}><Checkbox
                            checked={input.role ? true : false}
                            onChange={isAdmin}
                            value={input.role ? "1" : "0"}
                            color={"primary"}
                            style={{ padding: 0 }}
                            /> This user is administrator.</Typography>
                        ) : null}
                        
                    </Grid>
                </Grid>
                </form>
            </div>
        )
    }
}

UserForm.propTypes = {
    handleChangeInput: PropTypes.func,
    dataSource: PropTypes.any,
    showData: PropTypes.func,
    isAdmin: PropTypes.func,
    showAdminOption: PropTypes.bool
}

const styles = theme => ({
    
})

export default compose(
    withStyles( styles )
) (UserForm)