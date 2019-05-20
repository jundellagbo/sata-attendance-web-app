import React from "react";
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import Visibility from "@material-ui/icons/Visibility"
import Input from "./../components/Input"
import InputIcon from "./../components/InputIcon"
import Loader from "./../components/Loader"
import PropTypes from "prop-types"
import Notif from "./../components/Notif"
import Link from "./../components/Link"
import axios from "axios"
import { server_url } from "./../env"
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errors: "",
            loading: false,
            showPassword: false,
            notif: {
                open: false,
                message: "",
                key: 0
            }
        }
    }

    notify = (msg, open) => {
        this.setState({
            notif: {
                open: open,
                key: new Date().getTime(),
                message: msg
            }
        })
    }

    submit = () => {
        const e = this
        e.setState({ loading: true })
        const { username, password } = e.state
        axios.post(server_url + "api/auth/login", {
            username: username,
            password: password
        })
        .then((response) => {
            e.setState({ loading: false })
            if( response.data.response == "Unauthorised" ) {
                e.notify(response.data.count != 0 ? "Please wait for the confirmation." : "Invalid Login please try again", true)
            } else {
                localStorage.setItem("token", response.data.response.token)
                window.location.href = "/"
            }
        })
        .catch((error) => {
            this.notify("Invalid Login please try again.", true)
            e.setState({ loading: false })
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        
        const { classes } = this.props;
        
        const { username, password, loading, showPassword, notif } = this.state

        return (
            <div>
                <Paper className={ classes.root } square>
                    <Loader loading={loading}/>
                    <div className={ classes.wrap }>

                        <div style={{textAlign: "center"}}>
                            <img src={require("./../img/material-ui-logo.svg")} style={{width: 80, marginBottom: 10}} />
                        </div>
                        <Typography align={"center"} className={classes.headLines} variant={"h5"}>Sign in</Typography>
                        <Typography align={"center"} className={classes.headLines} component={"p"}>please enter your credential to login.</Typography>

                        <form className={classes.form}>

                        <Input 
                        value={username}
                        label={"Username/Email"}
                        type={"text"}
                        onChange={(e) => this.handleChange(e)}
                        name={"username"}
                        />

                        <Input 
                        value={password}
                        label={"Password"}
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => this.handleChange(e)}
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

                        <Button 
                        onClick={this.submit} 
                        className={classes.button} 
                        fullWidth 
                        variant={"contained"} 
                        color={"primary"}>Login</Button>

                        <div style={{ marginTop: 15 }}>
                        <Typography paragraph>Don't have account? <Link title={"Sign up"} href={"/register"} /></Typography>
                        </div>

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

Login.propTypes= {
    classes: PropTypes.object.isRequired
}

const styles = theme => ({
    /* ... custom styling here ... */
    root: {
        maxWidth: 350,
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

export default withStyles( styles ) ( Login )