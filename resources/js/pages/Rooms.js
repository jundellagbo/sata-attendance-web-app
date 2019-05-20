import React from "react";
import { 
    withStyles
} from "@material-ui/core";
import { compose } from "redux"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import RoomList from "../components/Rooms/RoomList"
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
class Rooms extends React.Component {
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
        await axios.get(server_url + "api/rooms?id=" + this.state.form.input.levelid, auth)
        .then(( response ) => {
            setTimeout(() => {
                if( response.data.response === 404 ) {
                    this.setState({ roomsloading: false, notFound: true })
                }
                this.setState({ roomsloading: false, rooms: response.data.sections })
            }, 200)
        })
        .catch(( error ) => {
            this.notify("Error fetching sections")
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
            roomname: "",
            levelid: this.props.match.params.lid
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
        const message = edit ? "Successfully saved!" : "Section has been added"
        e.setState({ loadingForm: true })
        if( input.roomname == "" ) {
            this.setState({ loadingForm: false })
            this.notify("The section name is required")
        } else {
            axios.post(server_url + "api/rooms/store", input, auth)
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
        axios.get(server_url + "api/rooms/search?q=" + this.state.search + "&id=" + this.state.form.input.strandid, auth)
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
        axios.get(server_url + "api/rooms/remove?id=" + id, auth)
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
        const paramsurl = this.props.match.params
        const isAdmin = this.props.user.role == 1 ? true : false

        if( roomsloading ) {
            return (
                <div>
                <Header title={"Sections"} user={this.props.user}/>
                <LoadingScreen />
                </div>
            )
        }

        if( notFound ) {
            return (
                <div>
                    <Header title={"Sections"} user={this.props.user}/>
                    <Content>
                        <Tpl title={"Section not Found"} img={require('./../img/material-ui-logo.svg')}>
                            <div>
                                <Typography paragraph>the section that you are looking for was not found.</Typography>
                                <Button color={"primary"} 
                                onClick={() => history.push("/tracks/" + paramsurl.tid + "/strands/" + paramsurl.sid + "/levels/")} size={"small"}>Back to Levels</Button>
                            </div>
                        </Tpl> 
                    </Content>
                </div>  
            )
        }

        return (
            <div>
            <Header title={"Sections"} user={this.props.user}/>
            <Content>
            <Modal
            title={edit ? "Edit Section" : "New Section"}
            open={openForm}
            size={"xs"}
            loading={loadingForm}
            actions={[
                {
                    variant: "contained",
                    color: "primary",
                    size: "small",
                    text: "Save Section",
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
                placeholder={"Enter Section Name"}
                value={form.input.roomname}
                inputname={"roomname"}
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
                        <Buttonicon tooltip={"Back to Levels"} color={"primary"} onClick={() => history.push("/tracks/" + paramsurl.tid + "/strands/" + paramsurl.sid + "/levels/")}>
                            <KeyboardBackspace />
                        </Buttonicon>
                    </Grid>
                    <Grid item xs={4}>
                        <Search 
                        placeholder={"Search Section"}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onSearch={() => this.search()}
                        value={ this.state.search }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        {
                            isAdmin && (
                                <Button 
                                style={{ float: "right" }} 
                                onClick={() => this.setState({ openForm: true })} 
                                size={"small"} 
                                color={"primary"} 
                                variant={"contained"}>New Section</Button>
                            )
                        }
                    </Grid>
                </Grid>
                {
                    rooms.length > 0 ?
                    (
                        <RoomList 
                        dataSource={rooms}
                        onEdit={(key, row) => this.edit(key, row)}
                        onRemove={(key, id) => this.setState({ delete: { open: true, id: id, key: key } })}
                        onRedirect={(id) => history.push("/tracks/" + paramsurl.tid + "/strands/" + paramsurl.sid + "/levels/" + paramsurl.lid + "/sections/" + id)}
                        isAdmin={isAdmin}
                        />
                    ) :
                    (
                        <Tpl title={"There is no section available"} img={require('./../img/material-ui-logo.svg')}>
                            <div>
                                <Typography paragraph>please add new room by clicking the button below.</Typography>
                                <Button color={"primary"} 
                                onClick={() => this.setState({ openForm: true })} style={{ marginRight: "10px" }} size={"small"}>New Section</Button>
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
                <Typography paragraph>Are you sure you want to remove this section?</Typography>
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
) ( Rooms )