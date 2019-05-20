import React from "react";
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Notif from "../components/Notif"
import Modal from "../components/Modal"
import ConfirmationList from "./../components/Home/ConfirmationList"
import PropTypes from "prop-types"
import Tpl from "./../components/Tpl"
import Content from "./../components/Content"
import { compose } from "redux"
import Header from "./../components/Header"
import LoadingScreen from "./../components/LoadingScreen"
import axios from "axios"
import { server_url, auth } from "./../env"
class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            loading: true,
            notif: {
                open: false,
                message: "",
                key: 1
            },
            action: {
                open: false,
                id: 0,
                type: "",
                key: 0
            },
            loadingConfirm: false
        }
        this.mounted = false;
    }

    async fetchData() {
        await axios.get(server_url + "api/users/confirmation", auth)
        .then(( response ) => {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    dataSource: response.data.response
                })
            }, 500)
        })
        .catch(( error ) => {
            this.notify("Error when fetching the data.", true)
            this.setState({ usersLoading: false })
        })
    }

    componentDidMount() {
        this.mounted = true
        if( this.mounted ) {
            if(this.props.user.role != 1) {
                this.props.history.push("/tracks")
            } else {
                this.fetchData()
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    notify = (message, open) => {
        this.setState({
            notif: {
                key: new Date().getTime(),
                message: message,
                open: open
            }
        })
    }

    doAction = (id, type, open, key) => {
        this.setState({ action: {id, type, open, key} })
    }

    submit = () => {
        this.setState({ loadingConfirm: true })
        const e = this
        const { action, dataSource } = this.state
        axios.post(server_url + "api/users/confirm", action , auth)
        .then((response) => {
            if( response.data.response ) {
                const data = [...dataSource]
                data.splice(action.key, 1)
                e.setState({
                    action: {
                        type: "",
                        key: 0,
                        id: 0,
                        open: false
                    },
                    dataSource: data
                })
            }
            e.notify(action.type == "approve" ? "User has been approved" : "User has been declined", true)
            this.setState({ loadingConfirm: false })
        })
        .catch((err) => {
            e.notify("Error Submission please try again.", true)
            this.setState({ loadingConfirm: false })
        })
    }
    
    render() {

        const { classes, history } = this.props
        const { action, dataSource, notif, loading, loadingConfirm } = this.state

        if( loading ) {
            return (
                <div>
                <Header title={"User Confirmation"} user={this.props.user}/>
                <LoadingScreen />
                </div>
            )
        }

        return (
            <div>
            <Header title={"User Confirmation"} user={this.props.user}/>
            <Content>
            <Notif 
            open={notif.open} 
            message={notif.message} 
            key={notif.key}
            onClose={() => this.setState({ notif: { open: false, message: ""} })}
            />

            <Modal
            open={action.open} 
            title={"Confirm Verification"}
            size={"xs"}
            loading={loadingConfirm}
            actions={
                [
                    {
                        variant: "text",
                        color: "primary",
                        text: "Confirm",
                        exec: () => this.submit()
                    },
                    {
                        variant: "text",
                        color: "primary",
                        text: "Cancel",
                        exec: () => this.setState({ action: { id: 0, type: "", open: false } })
                    }
                ]
            }>
                <Typography paragraph>Are you sure you want to approve this user?</Typography>
            </Modal>
            {
                dataSource.length ?
                (
                    <div>
                        <ConfirmationList 
                        dataSource={dataSource}
                        onApprove={(key, id) => this.doAction(id, "approve", true, key)}
                        onDecline={(key, id) => this.doAction(id, "decline", true, key)}
                        />
                        <div className={classes.textCenter}>
                            <Button 
                            onClick={() => history.push("/users")} 
                            className={classes.button}
                            variant={"contained"} 
                            color={"primary"}
                            size={"small"}
                            align={"center"}>See registered user</Button>
                        </div>
                    </div>
                ) :
                (
                    <Tpl 
                    img={require("./../img/material-ui-logo.svg")}
                    title={"There is no user verification for now"}>
                        <div>
                            <Typography paragraph>please check this page if there is new registered user.</Typography>
                            <Button
                            onClick={() => history.push("/users")}
                            color={"primary"}>
                                Show registered users
                            </Button>
                        </div>
                    </Tpl>
                )
            }
            </Content>
            </div>
        )
    }
}

Home.propTypes= {
    classes: PropTypes.object.isRequired
}

const styles = theme => ({
    /* ... use of custom styling */
    button: {
        marginBottom: "50px"
    },
    textCenter: {
        textAlign: "center"
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
});

export default compose(
    withStyles( styles )
) ( Home )