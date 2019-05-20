import React from "react";

import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Tpl from "./../components/Tpl"

/* -- ICONS -- */
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace"

import Modal from "./../components/Modal"
import Buttonicon from "./../components/Buttonicon"
import UserForm from "./../components/Users/UserForm"
import Search from "./../components/Search"
import UsersList from "./../components/Users/UsersList"
import Notif from "./../components/Notif"
import Content from "./../components/Content"
import { compose } from "redux"
import PropTypes from "prop-types"
import update from "react-addons-update"
import Header from "./../components/Header"
import axios from "axios"
import { server_url, auth } from "./../env"
import LoadingScreen from "./../components/LoadingScreen"
import PasswordForm from "./../components/Users/PasswordForm"

class Users extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            usersLoading: true,
            formLoading: false,
            openForm: false,
            changePassForm: false,
            changePassLoading: false,
            newPassword: "",
            passwordID: 0,
            form: {
                input: this.mutate(),
                key: 0,
                errors: {}
            },
            loadingDelete: false,
            delete: {
                open: false,
                id: 0,
                key: 0
            },
            notif: {
                open: false,
                message: "",
                key: 1
            },
            search: ""
        }
        this.mounted = false
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
            role: 0
        }
    }

    async fetchUser() {
        await axios.get(server_url + "api/users", auth)
        .then((response) => {
            setTimeout(() => {
                this.setState({ usersLoading: false, users: response.data.response })
            }, 500)
        })
        .catch((error) => {
            this.notify("Error fetching the data", true)
            this.setState({ usersLoading: false })
        })
    }

    componentDidMount() {
        this.mounted = true;
        if(this.mounted) {
            if(this.props.user.role != 1) {
                this.props.history.push("/rooms")
            } else {
                this.fetchUser();
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    openForm = () => {
        this.setState({
            openForm: true
        })
    }

    handleChangeInput = (e) => {
        const event = e.target
        this.setState((state) => {
            return {
                form: update(state.form, {
                    input: {
                        [event.name]: { $set: event.value }
                    }
                })
            }
        })
    }

    passW = (e) => {
        this.setState({ newPassword: event.value })
    }

    resetPassw = () => {
        this.setState({
            changePassForm: false,
            changePassLoading: false,
            newPassword: "",
            passwordID: 0
        })
    }

    changePassword = () => {
        const e = this
        e.setState({ changePassLoading: true })
        const { newPassword, passwordID } = e.state;
        if( newPassword == "" ) {
            e.notify("Enter new password", true)
            e.setState({ changePassLoading: false })
        } else {
            axios.post( server_url + "api/users/password/change", { id: passwordID, password: newPassword }, auth)
            .then(( response ) => {
                e.notify("New password has been saved!", true)
                e.resetPassw()
            })
            .catch(( error ) => {
                e.notify("New password not saved", true)
            })   
        }
    }

    search = () => {
        const { search } = this.state
        axios.get(server_url + "api/users/search?q=" + search, auth)
        .then(( response ) => {
            this.setState({ users: response.data.response, search: "" })
        })
        .catch(( error ) => {
            this.notify("Error Searching", true)
        })
    }

    resetField = () => {
        this.setState((state) => {
            return {
                openForm: false,
                loading: { form: false },
                form: update(state.form, {
                    input: { $set: this.mutate() }
                }),
                error: {}
            }
        })
    }

    edit = (row, key) => {
        this.setState((state) => {
            return {
                openForm: true,
                form: update(state.form, {
                    input: { $set: row },
                    key: { $set: key }
                })
            }
        })
    }

    notify = (message, open) => {
        this.setState({
            notif: {
                open: open,
                key: new Date().getTime(),
                message: message
            }
        })
    }

    remove = ( id, key ) => {
        const e = this;
        this.setState({ loadingDelete: true })
        axios.get(server_url + "api/users/remove?id=" + id, auth)
        .then((response) => {
            if(response.data.response === "removed") {
                e.notify("User has been successfully removed", true)
                const refresh = [...e.state.users]
                refresh.splice(key, 1)
                e.setState((state) => {
                    return {
                        users: refresh,
                        delete: {
                            open: false,
                            id: 0,
                            key: 0
                        }
                    }
                })
            } else {
                e.notify("Removing user failed", true)
            }
            e.setState({ loadingDelete: false })
        })
        .catch((error) => {
            e.notify("Removing user failed", true)
            e.setState({ loadingDelete: false })
        })
    }

    submitUser = () => {
        const { input, key } = this.state.form
        const edit = input.id != 0 ? true : false
        const url = edit ? "api/users/edit" : "api/users/add"
        const message = edit ? "User has been saved!" : "User has been successfully added!"
        this.setState({ formLoading: true })
        axios.post(server_url + url, this.state.form.input, auth)
        .then((response) => {
            this.setState({ formLoading: false })
            if( response.data.error ) {
                const error = response.data.error
                const message = error[Object.keys(error)[0]][0]
                this.notify(message, true)
            } else {
                if( !edit ) {
                    const id = response.data.response;
                    const newdata = this.state.form.input;
                    newdata.id = id;
                    this.setState({ users: [...this.state.users, newdata ] })
                } else {
                    this.setState((state) => {
                        return {
                            users: update(state.users, { [key]: { $set: state.form.input } })
                        }
                    })
                }
                this.notify(message, true)
                this.resetField();
            }
        })
        .catch((error) => {
            this.notify("Error when submitting the form.", true)
            this.setState({ formLoading: false })
        })
    }

    isAdmin = () => {
        this.setState((state) => {
            return {
                form: update(state.form, {
                    input: {
                        role: { $set: !state.form.input.role }
                    }
                })
            }
        })
    }
    
    render() {

        const { classes, history } = this.props

        const { users, openForm, form, search, notif, loadingDelete, usersLoading, formLoading, changePassForm, changePassLoading, newPassword } = this.state

        const { input } = form

        const edit = input.id == 0 ? false : true

        const { open, id, key } = this.state.delete

        if( usersLoading ) {
            return (
                <div>
                <Header title={"Registered Users"} user={this.props.user} />
                <LoadingScreen />
                </div>
            )
        }

        return (
            <div>
            <Header title={"Registered Users"} user={this.props.user} />
            <Content>
            <div>
                <Modal
                title={"Confirm Delete"}
                open={open}
                size={"xs"}
                loading={loadingDelete}
                actions={[
                    {
                        variant: "text",
                        color: "primary",
                        size: "small",
                        text: "Confirm",
                        exec: () => this.remove( id, key )
                    },
                    {
                        variant: "text",
                        color: "primary",
                        size: "small",
                        text: "Cancel",
                        exec: () => { this.setState({ delete: { open: false, id: 0 } }) }
                    }
                ]}
                >
                    <Typography paragraph>Are you sure you want to remove this user?</Typography>
                </Modal>

                <Grid container spacing={16} style={{ marginBottom: "20px" }}>
                    <Grid item xs={4}>
                        <Buttonicon tooltip={"Back to user verification"} color={"primary"} onClick={() => history.push("/")}>
                            <KeyboardBackspace />
                        </Buttonicon>
                    </Grid>
                    <Grid item xs={4}>
                        <Search
                        value={search}
                        placeholder={"Search user"}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onSearch={() => this.search()}
                        />
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: "right"}}>
                        <Button className={classes.btnAdd} onClick={() => this.openForm()} size={"small"} color={"primary"} variant={"contained"}>New User</Button>
                    </Grid>
                </Grid>
                {
                    users.length ?
                    (
                        <div>
                        <UsersList
                        dataSource={users}
                        onEdit={(id, key) => this.edit(id, key)}
                        onRemove={(id, key) => this.setState({ delete: { open: true, id, key } }) }
                        changePass={(id) => this.setState({ passwordID: id, changePassForm: true }) }
                        />
                        
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
                        passwInputChange={(e) => this.setState({ newPassword: e.target.value })}
                        password={newPassword}
                        confirm={{ init: false }}
                        />
                        </Modal>
                        </div>
                    )
                    :
                    (
                        <Tpl title={"There is no user for now."} img={require('./../img/material-ui-logo.svg')}>
                            <div>
                                <Typography paragraph>There is no user avilable for now.</Typography>
                            </div>
                        </Tpl>
                    )
                }
            </div>

            <Modal
            title={edit ? "Edit User" : "User Registration"}
            open={openForm}
            size={"sm"}
            loading={formLoading}
            actions={[
                {
                    variant: "contained",
                    color: "primary",
                    size: "small",
                    text: "Save User",
                    exec: () => this.submitUser()
                },
                {
                    variant: "text",
                    color: "primary",
                    size: "small",
                    text: "Cancel",
                    exec: () => { this.resetField() }
                },
            ]}>
                <UserForm 
                handleChangeInput={(e) => this.handleChangeInput(e)}
                dataSource={form}
                showData={(data) => this.notify(data, true)}
                isAdmin={() => this.isAdmin()}
                showAdminOption
                />
            </Modal>
            <Notif 
            open={notif.open}
            message={notif.message}
            key={notif.key}
            onClose={() => this.setState({ notif: { open: false, message: ""} })}
            />
            </Content>
            </div>
        )
    }
}

Users.propTypes= {
    classes: PropTypes.object.isRequired
}

const styles = theme => ({
    /* ... use of custom styling */
    
});

export default compose(
    withStyles( styles )
) ( Users )