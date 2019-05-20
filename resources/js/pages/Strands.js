import React from "react";
import { 
    withStyles
} from "@material-ui/core";
import { compose } from "redux"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import StrandList from "../components/Rooms/StrandList"
import Tpl from "../components/Tpl"
import Grid from "@material-ui/core/Grid"
import Search from "../components/Search"
import FormJS from "../components/Rooms/FormJS";
import Modal from "../components/Modal"
import Notif from "../components/Notif"
import Content from "../components/Content"
import update from "react-addons-update"
import Header from "../components/Header"
import { server_url, auth } from "../env"
import axios from "axios"
import LoadingScreen from "../components/LoadingScreen"
import Buttonicon from "./../components/Buttonicon"
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace"
class Strands extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms: [],
            form: {
                input: this.mutate()
            },
            delete: {
                open: false,
                id: 0,
                key: 0
            },
            notif: {
                open: false,
                message: "",
                key: 0
            },
            search: "",
            openForm: false,
            loadingForm: false,
            roomsloading: true,
            key: 0,
            removeLoading: false,
            notFound: false
        }
        this.mounted = false
    }

    async fetchData() {
        await axios.get(server_url + "api/rooms/strands?id=" + this.state.form.input.trackid, auth)
        .then(( response ) => {
            console.log( response )
            setTimeout(() => {
                if( response.data.response === 404 ) {
                    this.setState({ roomsloading: false, notFound: true })
                }
                this.setState({ roomsloading: false, rooms: response.data.strands })
            }, 200)
        })
        .catch(( error ) => {
            this.notify("Error fetching strands")
            this.setState({ roomsloading: false })
        })
    }

    componentDidMount() {
        this.mounted = true
        if( this.mounted ) {
            this.fetchData();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleChangeInput = (e) => {
        const event = e.target
        this.setState(( state ) => {
            return {
                form: update(state.form, {
                    input: {
                        [event.name]: { $set: event.value }
                    }
                })
            }
        })
    }

    mutate() {
        return {
            id: 0,
            strands: "",
            trackid: this.props.match.params.id
        }
    }

    cancelForm = () => {
        this.setState({ openForm: false })
        this.setState((state) => {
            return {
                form: update(state.form, {
                    input: { $set: this.mutate() }
                }),
                openForm: false,
                loadingForm: false,
                key: 0
            }
        })
    }

    submit = () => {
        const e = this
        const { input } = e.state.form
        const edit = input.id != 0 ? true : false
        const message = edit ? "Successfully saved!" : "Strand has been added"
        e.setState({ loadingForm: true })
        if( input.strands == "" ) {
            this.setState({ loadingForm: false })
            this.notify("The strand name is required")
        } else {
            axios.post(server_url + "api/rooms/strands/store", input, auth)
            .then(( response ) => {
                this.setState({ loadingForm: false })
                const id = response.data.response
                if( response.data.error ) {
                    const error = response.data.error
                    const message = error[Object.keys(error)[0]][0]
                    e.notify(message)
                } else {
                    if( !edit ) {
                        const insert = input
                        insert.id = id
                        this.setState({ rooms: [...this.state.rooms, insert ] })
                    } else {
                        const updated = input
                        updated.userid = this.props.user.id
                        this.setState(( state ) => {
                            return {
                                rooms: update( state.rooms, { [this.state.key]: { $set: updated } } )
                            }
                        })
                    }
                    this.notify(message, true)
                    this.cancelForm();
                }
            })
            .catch((error) => {
                e.setState({ loadingForm: false })
                e.notify("Please check your network connection")
            })
        }
    }

    notify = (message) => {
        this.setState({
            notif: {
                message,
                key: new Date().getTime(),
                open: true
            }
        })
    }

    search = () => {
        axios.get(server_url + "api/rooms/strands/search?q=" + this.state.search + "&id=" + this.state.form.input.trackid, auth)
        .then(( response ) => {
            this.setState({ rooms: response.data.response })
        })
        .catch(( error ) => {
            this.notify("Connection Error")
        })
        this.setState({ search: "" })
    }

    edit = (key, row) => {
        this.setState((state) => {
            return {
                openForm: true,
                form: update(state.form, {
                    input: { $set: row }
                }),
                key: key
            }
        })
    }

    resetRemove = () => {
        this.setState({ delete: { open: false, id: 0, key: 0 }, removeLoading: false })
    }

    remove = () => {
        this.setState({ removeLoading: true })
        const { id, key } = this.state.delete
        axios.get(server_url + "api/rooms/removev2?option=strand&id=" + id, auth)
        .then(( response ) => {
            const _rooms = [...this.state.rooms]
            _rooms.splice(key, 1)
            this.setState({ rooms: _rooms })
            this.resetRemove()
            this.notify("Successfully removed.")
        })
        .catch(( error ) => {
            this.notify("Error when removing track.")
        })
    }

    render() {
        const { history } = this.props
        const { rooms, openForm, form, notif, loadingForm, roomsloading, removeLoading, notFound } = this.state
        const { open } = this.state.delete 
        const { input } = form
        const edit = input.id == 0 ? false : true
        const isAdmin = this.props.user.role == 1 ? true : false

        if( roomsloading ) {
            return (
                <div>
                <Header title={"Strands"} user={this.props.user}/>
                <LoadingScreen />
                </div>
            )
        }

        if( notFound ) {
            return (
                <div>
                    <Header title={"Strands"} user={this.props.user}/>
                    <Content>
                        <Tpl title={"Strand not Found"} img={require('./../img/material-ui-logo.svg')}>
                            <div>
                                <Typography paragraph>the strand that you are looking for was not found.</Typography>
                                <Button color={"primary"} 
                                onClick={() => history.push("/tracks")} size={"small"}>Back to Tracks</Button>
                            </div>
                        </Tpl> 
                    </Content>
                </div>  
            )
        }

        return (
            <div>
            <Header title={"Strands"} user={this.props.user}/>
            <Content>
            <Modal
            title={edit ? "Edit Strand" : "New Strand"}
            open={openForm}
            size={"xs"}
            loading={loadingForm}
            actions={[
                {
                    variant: "contained",
                    color: "primary",
                    size: "small",
                    text: "Save Strand",
                    exec: () => this.submit()
                },
                {
                    variant: "text",
                    color: "primary",
                    size: "small",
                    text: "Cancel",
                    exec: () => { this.cancelForm() }
                },
            ]}>
                <FormJS 
                handleChangeInput={(e) => this.handleChangeInput(e)}
                dataSource={form}
                placeholder={"Enter Strand Name"}
                value={form.input.strands}
                inputname={"strands"}
                />
            </Modal>
            <Notif 
            open={notif.open}
            message={notif.message}
            key={notif.key}
            onClose={() => this.setState({ notif: { open: false, message: "", key: 0 } })}
            />
            <div>
                <div>
                <Grid container spacing={16} style={{ marginBottom: "20px" }}>
                    <Grid item xs={4}>
                        <Buttonicon tooltip={"Back to Tracks"} color={"primary"} onClick={() => history.push("/tracks")}>
                            <KeyboardBackspace />
                        </Buttonicon>
                    </Grid>
                    <Grid item xs={4}>
                        <Search 
                        placeholder={"Search strand"}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onSearch={() => this.search()}
                        value={ this.state.search }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        { isAdmin && (
                            <Button 
                            style={{ float: "right" }} 
                            onClick={() => this.setState({ openForm: true })} 
                            size={"small"} 
                            color={"primary"} 
                            variant={"contained"}>New Strand</Button>
                        ) }
                    </Grid>
                </Grid>
                {
                    rooms.length > 0 ?
                    (
                        <StrandList 
                        dataSource={rooms}
                        onEdit={(key, row) => this.edit(key, row)}
                        onRemove={(key, id) => this.setState({ delete: { open: true, id: id, key: key } })}
                        onRedirect={(id) => history.push("/tracks/" + input.trackid + "/strands/" + id + "/levels")}
                        isAdmin={isAdmin}
                        />
                    ) :
                    (
                        <Tpl title={"There is no strand available"} img={require('./../img/material-ui-logo.svg')}>
                            <div>
                                <Typography paragraph>please add new room by clicking the button below.</Typography>
                                <Button color={"primary"} 
                                onClick={() => this.setState({ openForm: true })} style={{ marginRight: "10px" }} size={"small"}>New Strand</Button>
                            </div>
                        </Tpl>
                    )
                }

                <Modal 
                title={"Confirm Delete"}
                open={open}
                size={"xs"}
                loading={removeLoading}
                actions={[
                    {
                        variant: "text",
                        color: "primary",
                        size: "small",
                        text: "Confirm",
                        exec: () => this.remove()
                    },
                    {
                        variant: "text",
                        color: "primary",
                        size: "small",
                        text: "Cancel",
                        exec: () => { this.setState({ delete: { open: false, id: 0, key: 0 } }) }
                    }
                ]}
                >
                <Typography paragraph>Are you sure you want to remove this strand?</Typography>
                </Modal>

                </div>
            </div>
            </Content>
            </div>
        )
    }
}

const style = theme => ({
    
})

export default compose(
    withStyles( style )
) ( Strands )