import React from "react";
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Visibility from "@material-ui/icons/Visibility"
import Grid from "@material-ui/core/Grid"
import Input from "./../components/Input"
import InputIcon from "./../components/InputIcon"
import Loader from "./../components/Loader"
import PropTypes from "prop-types"
import Notif from "./../components/Notif"
import Link from "./../components/Link"
import update from "react-addons-update"
import axios from "axios"
import { server_url } from "./../env"
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: this.mutate(),
            errors: "",
            loading: false,
            showPassword: false,
            showConfirm: false,
            notif: {
                open: false,
                message: "",
                key: 0
            }
        }
    }

    mutate = () => {
        return {
            id: 0,
            username: "",
            middlename: "",
            lastname: "",
            contact: "",
            username: "",
            email: "",
            password: "",
            firstname: "",
            password: "",
            confirm: ""
        }
    }

    handleChangeInput = (e) => {
        const event = e.target
        this.setState((state) => {
            return {
                input: update(state.input, {
                    [event.name]: {$set: event.value}
                })
            }
        })
    }

    notify = (msg) => {
        this.setState({
            notif: {
                open: true,
                key: new Date().getTime(),
                message: msg
            }
        })
    }

    submit = () => {
        this.setState({ loading: true })
        const input = this.state.input
        if(input.password != input.confirm) {
            this.setState({ loading: false })
            this.notify("Please clarify your password.")
        } else {
            axios.post(server_url + "api/auth/register", input)
            .then(response => {
                this.setState({ loading: false })
                if( response.data.error ) {
                    const error = response.data.error
                    const message = error[Object.keys(error)[0]][0]
                    this.notify(message)
                } else {
                    this.notify("You are now registered, please wait for the confirmation.")
                    this.setState({ input: this.mutate() })
                }
            })
            .catch(error => {
                this.setState({ loading: false })
                this.notify("Error when submitting form please try again.")
            })
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        
        const { classes } = this.props;
        
        const { input, loading, showPassword, notif, showConfirm } = this.state

        return (
            <div>
                <Paper className={ classes.root } square>
                    <Loader loading={loading}/>
                    <div className={ classes.wrap }>

                        <div style={{textAlign: "center"}}>
                            <img src={require("./../img/material-ui-logo.svg")} style={{width: 80, marginBottom: 10}} />
                        </div>
                        <Typography align={"center"} className={classes.headLines} variant={"h5"}>Sign up</Typography>
                        <Typography align={"center"} className={classes.headLines} component={"p"}>Lorem Ipsum is simply.</Typography>

                        <form className={classes.form}>

                        <Grid container spacing={16}>
                            <Grid item lg={6}>

                            <Input 
                            value={input.firstname}
                            label={"Firstname"}
                            type={"text"}
                            onChange={(e) => this.handleChangeInput(e)}
                            name={"firstname"}
                            />

                            <Input 
                            value={input.middlename}
                            label={"Middlename"}
                            type={"text"}
                            onChange={(e) => this.handleChangeInput(e)}
                            name={"middlename"}
                            />

                            <Input 
                            value={input.lastname}
                            label={"Lastname"}
                            type={"text"}
                            onChange={(e) => this.handleChangeInput(e)}
                            name={"lastname"}
                            />

                            <Input 
                            value={input.contact}
                            label={"Contact Number"}
                            type={"text"}
                            onChange={(e) => this.handleChangeInput(e)}
                            name={"contact"}
                            />

                            </Grid>
                            <Grid item lg={6}>

                            <Input 
                            value={input.username}
                            label={"Username"}
                            type={"text"}
                            onChange={(e) => this.handleChangeInput(e)}
                            name={"username"}
                            />

                            <Input 
                            value={input.email}
                            label={"Email address"}
                            type={"text"}
                            onChange={(e) => this.handleChangeInput(e)}
                            name={"email"}
                            />


                            <Input 
                            value={input.password}
                            label={"Password"}
                            type={!showPassword ? "password" : "text"}
                            onChange={(e) => this.handleChangeInput(e)}
                            name={"password"}
                            icon={{
                                endAdornment: (
                                    <InputIcon 
                                    position={"end"}
                                    tooltip={showPassword ? "Hide Password" : "Show Password"}
                                    onClick={() => this.setState({ showPassword: !showPassword })}
                                    >
                                        {!showPassword ? (<Visibility />) : (<VisibilityOff />) }
                                    </InputIcon>
                                )
                            }}
                            />

                            <Input 
                            value={input.confirm}
                            label={"Confirm Password"}
                            type={!showConfirm ? "password" : "text"}
                            onChange={(e) => this.handleChangeInput(e)}
                            name={"confirm"}
                            icon={{
                                endAdornment: (
                                    <InputIcon 
                                    position={"end"}
                                    tooltip={showConfirm ? "Hide Password" : "Show Password"}
                                    onClick={() => this.setState({ showConfirm: !showConfirm })}
                                    >
                                        {!showConfirm ? (<Visibility />) : (<VisibilityOff />) }
                                    </InputIcon>
                                )
                            }}
                            />

                            </Grid>
                        </Grid>

                        <Button 
                        onClick={this.submit} 
                        className={classes.button}
                        variant={"contained"} 
                        color={"primary"}>Register</Button>
                        <Typography style={{ float: "right", marginTop: 20 }} paragraph>Already have account? <Link title={"Sign in"} href={"/login"} /></Typography>

                        </form>
                    </div>
                </Paper>
                <Notif 
                open={notif.open}
                message={notif.message}
                key={notif.key}
                onClose={() => this.setState({ notif: { message: "", open: false, key: new Date().getTime() } })}
                />
            </div>
        );
    }
}

Register.propTypes= {
    classes: PropTypes.object.isRequired
}

const styles = theme => ({
    /* ... custom styling here ... */
    root: {
        maxWidth: 650,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        flexWrap: "wrap"
    },
    button: {
        marginTop: "20px"
    },
    wrap: {
        padding: "30px 20px 20px 20px"
    },
    headLines: {
        marginBottom: "10px"
    }
})

export default withStyles( styles ) ( Register )