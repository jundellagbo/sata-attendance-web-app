import React from "react";

import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

import Home from "@material-ui/icons/Home"
import AccountCircle from "@material-ui/icons/AccountCircle"
import VerifiedUser from "@material-ui/icons/VerifiedUser"
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew"
import Assignment from "@material-ui/icons/Assignment"
import Message from "@material-ui/icons/Message"

import { withRouter } from "react-router-dom"
import { compose } from "redux"

import Buttonicon from "./../components/Buttonicon"
import Modal from "./../components/Modal"
import UserForm from "./../components/Users/UserForm"
import PasswordForm from "./../components/Users/PasswordForm"
import Notif from "./Notif"

import PropTypes from "prop-types"
import update from "react-addons-update"

import { server_url, auth, _removeUser, _redirectJS } from "./../env"
import axios from "axios"

const styles = theme => ({
    /* ... custom styling here ... */
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    grow: {
        flexGrow: 1
    },
    icons: {
        marginLeft: "4px",
        marginRight: "4px"
    },
    zIndex: {
        zIndex: theme.zIndex.drawer+1
    }
});

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                input: props.user
            },
            openForm: false,
            loadingForm: false,
            notif: {
                open: false,
                message: "",
                key: 0
            },
            newPassword: "",
            confirmPassword: "",
            changePassForm: false,
            changePassLoading: false,
            smscreditsloading: false
        }
    }

    logout = () => {
        let confirm = window.confirm("Are you sure you want to logout?")
        if( confirm ) {
            axios.get(server_url + "api/auth/logout", auth)
            .then(( response ) => {
                _removeUser()
                _redirectJS("/login")
            })
            .catch((error) => {
                _removeUser()
                _redirectJS("/login")
            })
        }
    }

    notify = (message) => {
        this.setState({ notif: { message, open: true, key: new Date().getTime() } })
    }

    handleChangeInput = (e) => {
        const event = e.target
        this.setState((state) => {
            return {
                user: update(state.user, {
                    input: {
                        [event.name]: {$set: event.value}
                    }
                })
            }
        })
    }

    submitUser = () => {
        this.setState({ loadingForm: true })
        axios.post(server_url + "api/users/edit", this.state.user.input, auth)
        .then(response => {
            if( response.data.error ) {
                const error = response.data.error
                const message = error[Object.keys(error)[0]][0]
                this.notify(message)
            } else {
                this.notify("page will automatically refresh on 2 seconds to apply changes.")
                setTimeout(() => {
                    _redirectJS(window.location.href)
                }, 2000)
            }
            this.setState({ loadingForm: false })
        })
        .catch(error => {
            this.notify("Error when submitting form, please try again")
            this.setState({ loadingForm: false })
        })
    }

    resetPassw = () => {
        this.setState({
            changePassForm: false,
            changePassLoading: false,
            newPassword: ""
        })
    }

    changePassword = () => {
        const e = this
        e.setState({ changePassLoading: true })
        const { newPassword, confirmPassword } = e.state;
        if( newPassword == "" ) {
            e.notify("Enter new password", true)
            e.setState({ changePassLoading: false })
        } else {
            if(newPassword != confirmPassword) {
                e.notify("Password not matched.", true)
                e.setState({ changePassLoading: false })
            } else {
                axios.post( server_url + "api/users/password/change", { id: this.state.user.input.id, password: newPassword }, auth)
                .then(( response ) => {
                    e.notify("Password has been saved!", true)
                })
                .catch(( error ) => {
                    e.notify("Password not saved", true)
                }) 
                e.resetPassw()
            }
        }
    }

    smsCredits = () => {
        this.setState({ smscreditsloading: true })
        axios.get("https://cors-anywhere.herokuapp.com/https://api.semaphore.co/api/v4/account?apikey=0bee39393ec3eaa09571ad11d7e2dce2", { headers: {
            "X-Requested-With": "application/json"
        } })
        .then( response => {
            this.setState({ smscreditsloading: false })
            this.notify("SMS Credits: " + response.data.credit_balance)
        })
        .catch( error => {
            this.setState({ smscreditsloading: false })
            this.notify("Error when retrieving SMS credits.")
        })
    }
    
    render() {

        const {user, openForm, loadingForm, notif, newPassword, changePassForm, changePassLoading, confirmPassword, smscreditsloading} = this.state

        const { classes, title, history } = this.props
        
        return (
            <div className={classes.root}>
                <Notif 
                open={notif.open}
                message={notif.message}
                key={notif.key}
                onClose={() => this.setState({ notif: { open: false, message: "", key: 0} })}
                />
               <AppBar position={"fixed"} className={classes.zIndex}>
               
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            {title}
                        </Typography>
                        <div>

                            <Button onClick={() => this.smsCredits()} style={{ marginRight: 15 }} color={"inherit"}>
                            { smscreditsloading ? "Retrieving..." : "SMS Credits" }
                            </Button>

                            {
                                user.input.role == 1 ?
                                (
                                    <Buttonicon onClick={() => history.push("/")} tooltip={"User Verification"} color={"inherit"} className={classes.icons} >
                                        <VerifiedUser />
                                    </Buttonicon>
                                ) : null
                            }

                            <Buttonicon onClick={() => history.push("/tracks")} tooltip={"Tracks"} color={"inherit"} className={classes.icons} >
                                <Home />
                            </Buttonicon>
                            
                            <Buttonicon tooltip={"Logs"} color={"inherit"} onClick={() => history.push("/logs")} className={classes.icons}>
                                <Assignment />
                            </Buttonicon>

                            <Buttonicon tooltip={"Send SMS"} color={"inherit"} onClick={() => history.push("/sms")} className={classes.icons}>
                                <Message />
                            </Buttonicon>

                            <Buttonicon tooltip={"My Account"} color={"inherit"} onClick={() => this.setState({ openForm: true })} className={classes.icons}>
                                <AccountCircle />
                            </Buttonicon>

                            <Buttonicon tooltip={"Logout"} color={"inherit"} onClick={() => this.logout()} className={classes.icons}>
                                <PowerSettingsNew />
                            </Buttonicon>

                            <Modal
                            open={openForm}
                            loading={loadingForm}
                            size={"sm"}
                            title={"My Account"}
                            actions={[
                                {
                                    variant: "contained",
                                    color: "primary",
                                    size: "small",
                                    text: "Save User",
                                    exec: () => this.submitUser()
                                },
                                {
                                    variant: "contained",
                                    color: "secondary",
                                    size: "small",
                                    text: "Change Password",
                                    exec: () => this.setState({ changePassForm: true, openForm: false })
                                },
                                {
                                    variant: "text",
                                    color: "primary",
                                    size: "small",
                                    text: "Cancel",
                                    exec: () => { this.setState({ openForm: false }) }
                                },
                            ]}
                            >
                            <UserForm 
                            dataSource={user}
                            showData={(val) => this.notify( val )}
                            handleChangeInput={(e) => this.handleChangeInput(e)}
                            showAdminOption={false}/>
                            </Modal>

                            <Modal 
                            title={"Change Password"}
                            open={changePassForm}
                            size={"xs"}
                            loading={changePassLoading}
                            actions={[
                                {
                                    variant: "contained",
                                    color: "primary",
                                    size: "small",
                                    text: "Change Password",
                                    exec: () => this.changePassword()
                                },
                                {
                                    variant: "text",
                                    color: "primary",
                                    size: "small",
                                    text: "Cancel",
                                    exec: () => this.resetPassw()
                                }
                            ]}
                            >
                            <PasswordForm
                            passwInputChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                            password={newPassword}
                            confirm={{ init: true, value: confirmPassword }}
                            />
                            </Modal>

                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

Header.propTypes= {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    history: PropTypes.object,
    user: PropTypes.object
}

export default compose(
    withRouter,
    withStyles( styles )
)(Header)