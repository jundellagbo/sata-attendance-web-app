import React from "react"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"

import Buttonicon from "./../components/Buttonicon"
import Search from "./../components/Search"
import Modal from "./../components/Modal"
import Tpl from "./../components/Tpl"
import StudentsForm from "./../components/Students/StudentsForm"
import Content from "./../components/Content"
import update from "react-addons-update"

import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace"
import Visibility from "@material-ui/icons/Visibility"
import Edit from "@material-ui/icons/Edit"
import Delete from "@material-ui/icons/Delete"

import { withStyles } from "@material-ui/core/styles"
import { compose } from "redux"
import Header from "./../components/Header"
import { server_url, auth } from "./../env"
import axios from "axios";
import LoadingScreen from "./../components/LoadingScreen"
import Notif from "./../components/Notif"

import Subjects from "./../components/Students/Subjects"

class RoomSingle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            room: props.match.params.id,
            dataSource: [],
            search: "",
            form: {
                input: this.mutate(),
                errors: {}
            },
            openForm: false,
            is404: false,
            loading: true,
            loadingForm: false,
            notif: {
                open: false,
                message: "",
                key: 0
            },
            info: {
                open: false,
                student: {},
            },
            _delete: {
                id: 0,
                key: 0
            },
            editKey: 0,
            openDelete: false,
            loadingDelete: false,
            subjectInput: {
                id: 0,
                subjectname: "",
                timein: "",
                timeout: ""
            },
            subjects: [],
            subjectModal: false,
            modalSubject: false,
            loadingSubject: true,
            subjectKey: 0
        }
    }
    mutate() {
        return {
            id: 0,
            firstname: "",
            middlename: "",
            lastname: "",
            address: "",
            contact: "",
            guardian_name: "",
            guardian_contact: ""
        }
    }

    async fetchData() {
        await axios.get(server_url + "api/students?id=" + this.props.match.params.id, auth)
        .then( ( response ) => {
            setTimeout(() => {
                if( response.data == 0 ) {
                    this.setState({ is404: true, loading: false, dataSource: [] })
                } else {
                    this.setState({ loading: false, dataSource: response.data })
                }
            }, 200)
        } )
        .catch(( error ) => {
            this.setState({ is404: true, loading: false, dataSource: [] })
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    resetField = () => {
        this.setState((state) => {
            return {
                form: update(state.form, {
                    input: { $set: this.mutate()}
                }),
                error: {},
                openForm: false,
                editKey: 0
            }
        })
    }

    handleChangeInput = e => {
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

    notify = ( message ) => {
        this.setState({ notif: { open: true, message, key: new Date().getTime() } })
    }

    _edit = (row, key) => {
        this.setState({ form: { input: row }, openForm: true, editKey: key })
    }

    submit = () => {
        this.setState({ loadingForm: true })
        const input = this.state.form.input
        input.roomid = this.props.match.params.id
        const edit = input.id != 0 ? true : false
        const message = edit ? "Student has been changed" : "Student has been added."
        axios.post( server_url + "api/students/store", this.state.form.input, auth)
        .then((response) => {
            this.setState({ loadingForm: false })
            if(response.data.error) {
                // error handling
                const error = response.data.error
                const message = error[Object.keys(error)[0]][0]
                this.notify(message)
            }
            else {

                if( !edit ) {
                    // insert here
                    const id = response.data.response
                    const input = this.state.form.input
                    input.id = id
                    this.setState((state) => {
                        return {
                            dataSource: update(state.dataSource, {
                                students: { $set: [...state.dataSource.students, input] }
                            })
                        }
                    })
                }
                else {
                    // update here
                    const updateInput = this.state.form.input
                    this.setState((state) => {
                        return {
                            dataSource: update(state.dataSource, {
                                students: {
                                    [this.state.editKey]: { $set: updateInput }
                                }
                            })
                        }
                    })
                }

                this.notify(message)
                this.resetField()
            }
        })
        .catch((error) => {
            this.setState({ loadingForm: false })
            this.notify("Error submitting form. please try again")
        })
    }

    removeStudent = () => {
        this.setState({ loadingDelete: true })
        const { key, id } = this.state._delete
        axios.get(server_url + "api/students/remove?id=" + id, auth)
        .then(response => {
            const users = [...this.state.dataSource.students]
            users.splice(key, 1)
            this.setState((state) => {
                return {
                    dataSource: update(state.dataSource, {
                        students: { $set: users }
                    })
                }
            })
            this.doneRemove()
        })
        .catch(error => {
            this.notify("Error removing student, please try again.")
            this.setState({ loadingDelete: false })
        })
    }

    doneRemove = () => {
        this.setState({ loadingDelete: false, openDelete: false, _delete: { id: 0, key: 0 } })
    }

    search = () => {
        axios.get(server_url + "api/students/search?q=" + this.state.search + "&roomid=" + this.props.match.params.id, auth)
        .then(response => {
            this.setState((state) => {
                return {
                    dataSource: update(state.dataSource, {
                        students: { $set: response.data.response }
                    })
                }
            })
        })
        .catch(error => {
            this.notify("Error Search, please try again")
        })
        this.setState({ search: "" })
    }

    changeInputSubject = event => {
        const e = event.target
        this.setState((state) => {
            return {
                subjectInput: update(state.subjectInput, {
                    [e.name]: {$set: e.value}
                })
            }
        })
    }

    loadingSubjects = () => {
        this.setState({ subjectModal: true })
        axios.get(server_url+"api/rooms/subject?id=" + this.state.room, auth)
        .then( response => {
            this.setState({ subjects: response.data.response, loadingSubject: false })
        })
        .catch( error => {
            this.notify("Connection Error")
        })
    }

    removeSubject = (id, key) => {
        var confirm = window.confirm("Are you sure you want to remove this subject?")
        if( confirm ) {
            axios.get(server_url+"api/rooms/subject/remove?id=" + id, auth)
            .then(response => {
                const subjects = this.state.subjects
                subjects.splice(key, 1)
                this.setState({ subjects })
                this.notify("Subject has been successfully removed!")
            })
            .catch(error => {
                this.notify("Connection Error")
            })
        }
    }

    validate = () => {
        const {subjectInput} = this.state
        let ret = ""
        if(subjectInput.subjectname  == "" ) {
            ret = "The field subjectname is required"
        } else if (subjectInput.timein == "") {
            ret = "The field timein is required"
        } else if(subjectInput.timeout == "") {
            ret = "The field timeout is required"
        }
        return ret;
    }

    submitSubject = () => {
        this.setState({ modalSubject: true })
        const validate = this.validate()
        if( validate != "" ) {
            this.notify(validate)
            this.setState({ modalSubject: false })
        } else {
            const inputs = this.state.subjectInput
            inputs.roomid = this.state.room
            axios.post(server_url+"api/rooms/subject/store", inputs, auth)
            .then( response => {
                let notify = ""
                if( inputs.id != 0 ) {
                    this.setState((state) => {
                        return {
                            subjects: update(state.subjects, {
                                [this.state.subjectKey]: {$set: inputs}
                            }),
                            modalSubject: false
                        }
                    })
                    this.resetSubject()
                    notify = "Subject has been saved."
                } else {
                    inputs.id = response.data.response
                    const insert = [...this.state.subjects, inputs]
                    this.setState({ subjects: insert, modalSubject: false })
                    this.resetSubject()
                    notify = "Subject has been added."
                }
                this.notify(notify)
            })
            .catch( error => {
                this.notify("Connection Error")
                this.setState({ modalSubject: false })
            })
        }
    }

    resetSubject = () => {
        this.setState({ subjectInput: { id: 0, subjectname: "", timein: "", timeout: "" }, subjectKey: 0 })
    }

    render() {
        const { classes, history } = this.props
        const { form, dataSource, openForm, loading, is404, loadingForm, notif, info, search, openDelete, loadingDelete, subjectInput, subjects, 
            subjectModal, loadingSubject, modalSubject } = this.state
        const { input } = form
        const edit = input.id == 0 ? false : true
        const paramsurl = this.props.match.params
        const isAdmin = this.props.user.role == 1 ? true : false
        
        const NoStudents = () => (
            <Tpl title={"There is no students found."} img={require('./../img/material-ui-logo.svg')}>
                <div>
                    <Typography paragraph>please add new student on this room.</Typography>
                </div>
            </Tpl>
        )

        const StudentsList = () => dataSource.students.length ? dataSource.students.sort((a, b) => {
            if(a.lastname.toLowerCase() < b.lastname.toLowerCase()) return -1;
            if(a.lastname.toLowerCase() < b.lastname.toLowerCase()) return 1;
            return 0;
        }).map(( row, key ) =>
            <TableRow hover key={row.id}>
                <TableCell align={"left"} component="th" scope="row">{row.lastname}, {row.firstname} {row.middlename.charAt(0)}.</TableCell>
                <TableCell align={"left"}>{row.address}</TableCell>
                <TableCell align={"left"}>{row.contact}</TableCell>
                <TableCell align={"right"}>
                    <Buttonicon tooltip={"View Student"} color={"primary"} onClick={() => this.setState({ info: { open: true, student: row} }) }>
                        <Visibility />
                    </Buttonicon>
                    {
                        isAdmin && (
                            <div style={{ display: "inline" }}>
                                <Buttonicon tooltip={"Edit"} color={"primary"} onClick={() => this._edit( row, key ) }>
                                    <Edit />
                                </Buttonicon>
                                <Buttonicon tooltip={"Remove"} color={"secondary"} onClick={() => this.setState({ _delete: { id: row.id, key }, openDelete: true }) }>
                                    <Delete />
                                </Buttonicon>
                            </div>
                        )
                    }
                </TableCell>
            </TableRow>
        ) : null

        const Students = () => dataSource.students.length ? (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={style.theadcol} align={"left"}>Fullname</TableCell>
                            <TableCell style={style.theadcol} align={"left"}>Address</TableCell>
                            <TableCell style={style.theadcol} align={"left"}>Contact</TableCell>
                            <TableCell style={style.theadcol} align={"left"}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StudentsList/>
                    </TableBody>
                </Table>
            </Paper>
        ) : (<NoStudents />)

        if( loading ) {
            return (
                <div>
                    <Header title={"Students"} user={this.props.user}/>
                    <LoadingScreen />
                </div>
            )
        }

        if( is404 ) {
            return (
                <div>
                    <Header title={"Students"} user={this.props.user}/>
                    <Content>
                        <Tpl title={"Room not Found"} img={require('./../img/material-ui-logo.svg')}>
                            <div>
                                <Typography paragraph>the room that you are looking for was not found.</Typography>
                                <Button color={"primary"} 
                                onClick={() => history.push("/rooms")} size={"small"}>Back to Strand</Button>
                            </div>
                        </Tpl> 
                    </Content>
                </div>  
            )
        }

        const InfoStudent = (props) => (
            <div>
                <Typography paragraph>Fullname: {props.ds.firstname} {props.ds.middlename} {props.ds.lastname}</Typography>
                <Typography paragraph>Address: {props.ds.address}</Typography>
                <Typography paragraph>Contact: {props.ds.contact}</Typography>
                <Typography style={{ marginBottom: 10 }} variant={"h6"}>Contact Person:</Typography>
                <Typography paragraph>Name: {props.ds.guardian_name}</Typography>
                <Typography paragraph>Number: {props.ds.guardian_contact}</Typography>
            </div>
        )

        return (
            <div>
            <Header title={"Students"} user={this.props.user} />
            <Content>
            <div>
            <Modal 
            title={"Students Information"}
            open={info.open}
            size={"xs"}
            actions={[
                {
                    variant: "text",
                    color: "primary",
                    size: "small",
                    text: "Close",
                    exec: () => this.setState({ info: { open: false, student: {} } })
                }
            ]}
            >
                <InfoStudent ds={info.student} />
            </Modal>
            <Typography align={"center"} style={{ textTransform: "uppercase" }} variant={"h5"}>{dataSource.roomname}</Typography>
            <Grid container spacing={16} style={{ marginBottom: "20px", marginTop: 15 }}>
                <Grid item xs={4}>
                    <Buttonicon tooltip={"Back to Sections"} color={"primary"} onClick={() => history.push("/tracks/" + paramsurl.tid + "/strands/" + paramsurl.sid + "/levels/" + paramsurl.lid + "/sections")}>
                        <KeyboardBackspace />
                    </Buttonicon>
                </Grid>
                <Grid item xs={4}>
                    <Search
                    value={search}
                    placeholder={"Search Student"}
                    onChange={(e) => this.setState({ search: e.target.value })}
                    onSearch={() => this.search()}
                    />
                </Grid>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                    <Button
                    color={"secondary"}
                    variant={"contained"}
                    size={"small"}
                    style={{ marginRight: 10 }}
                    onClick={() => this.loadingSubjects()}
                    >Subjects</Button>

                    { isAdmin && (
                        <Button
                        color={"primary"}
                        variant={"contained"}
                        size={"small"}
                        style={{ marginRight: 10 }}
                        onClick={() => this.setState({ openForm: true })}
                        >Add Student</Button>
                    )}
                </Grid>
            </Grid>
            <Students />
            </div>
            <Modal
            title={edit ? "Edit Student" : "Students Registration"}
            open={openForm}
            size={"sm"}
            loading={loadingForm}
            actions={[
                {
                    variant: "contained",
                    color: "primary",
                    size: "small",
                    text: "Save Student",
                    exec: () => this.submit()
                },
                {
                    variant: "text",
                    color: "primary",
                    size: "small",
                    text: "Cancel",
                    exec: () => this.resetField()
                },
            ]}>
                <StudentsForm 
                handleChangeInput={(e) => this.handleChangeInput(e)}
                dataSource={form}
                />
            </Modal>

            <Modal
            title={"Confirm Deletion"}
            open={openDelete}
            size={"xs"}
            loading={loadingDelete}
            actions={[
                {
                    variant: "text",
                    color: "primary",
                    size: "small",
                    text: "Confirm",
                    exec: () => this.removeStudent()
                },
                {
                    variant: "text",
                    color: "primary",
                    size: "small",
                    text: "Close",
                    exec: () => this.doneRemove()
                }
            ]}>
                <Typography paragraph>Are you sure you want to remove this user?</Typography>
            </Modal>

            <Modal
            title={"Subjects Lists"}
            open={subjectModal}
            size={"sm"}
            loading={modalSubject}
            actions={[
                {
                    variant: "text",
                    color: "primary",
                    size: "small",
                    text: "Close",
                    exec: () => this.setState({ subjectModal: !subjectModal })
                }
            ]}>
                <Subjects 
                input={subjectInput}
                onPress={() => this.submitSubject()}
                loading={loadingSubject}
                dataSource={subjects}
                changeTxt={(e) => this.changeInputSubject(e)}
                onEdit={(row, key) => this.setState({ subjectInput: row, subjectKey: key })}
                onRemove={(id, key) => this.removeSubject(id, key)}
                onRecord={(id) => history.push("/tracks/" + paramsurl.tid + "/strands/" + paramsurl.sid + "/levels/" + paramsurl.lid + "/sections/" + paramsurl.id + "/records/" + id)}
                cancelEdit={() => this.resetSubject()}
                />
            </Modal>

            <Notif 
            open={notif.open}
            message={notif.message}
            key={notif.key}
            onClose={() => this.setState({ notif: { open: false, message: "", key: 0 } })}
            />
            </Content>
            </div>
        )
    }
}
const style = theme => ({
    p: {
        margin: "5px 0"
    }
})
export default compose(
    withStyles( style )
) (RoomSingle)