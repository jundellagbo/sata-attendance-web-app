import React from "react";
import { withStyles } from "@material-ui/core/styles"
import Header from "./../components/Header"
import Content from "./../components/Content"
import Grid from "@material-ui/core/Grid"
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers"
import DateFnsUtils from "@date-io/date-fns"
import Button from "@material-ui/core/Button"
import { server_url, auth } from "./../env"
import axios from "axios"
import LoadingScreen from "./../components/LoadingScreen"
import Tpl from "./../components/Tpl"
import Typography from "@material-ui/core/Typography"
import Buttonicon from "./../components/Buttonicon"
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace"
import Save from "@material-ui/icons/Save"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper"
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";
class Records extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            room: props.match.params.id,
            subject: props.match.params.subject,
            fromdate: new Date(),
            todate: new Date(),
            students: [],
            records: [],
            subj: [],
            loading: true,
            csvData: [],
            notFound: false
        }
        this.mounted = false
    }
    handleDateChange = (key, date) => {
        this.setState({ [key]: date })
    }
    componentDidMount() {
        this.mounted = true
        this.retrieve();
    }
    withZero = val => {
        return val < 10 ? "0" + val : val
    }
    getDate = val => {
        return val.getFullYear() + "-" + this.withZero(val.getMonth() + 1 ) + "-" + this.withZero(val.getDate())
    }
    retrieve = () => {
        this.mounted = true
        this.setState({ loading: true, csvData: [] })
        const { room, subject, fromdate, todate } = this.state
        axios.get(server_url+"api/attendance/records?roomid=" + room + "&subjectid=" + subject + "&from=" + this.getDate(fromdate) + "&to=" + this.getDate(todate), auth)
        .then( response => {
            if( this.mounted ) {
                if( response.data.response == "404" ) {
                    this.setState({ loading: false, notFound: true })
                } else {
                    this.setState({ loading: false, notFound: false, students: response.data.students, records: response.data.response, subj: response.data.subjects })
                    
                    const csv = this.state.csvData
                    csv.push(["Instructor: " + this.props.user.firstname + " " + this.props.user.middlename + " " + this.props.user.lastname ])
                    csv.push(["Subject: " + response.data.subjects[0].subjectname])
                    csv.push(["Time: " + response.data.subjects[0].timein + " - " + response.data.subjects[0].timeout])
                    csv.push([""])
                    csv.push(["Names"]);
                    response.data.response.length ? response.data.response.map(( row ) => (
                        csv[4].push(row.date_recorded)
                    )) : null

                    response.data.students.length ? response.data.students.sort((a, b) => {
                        if(a.lastname.toLowerCase() < b.lastname.toLowerCase()) return -1;
                        if(a.lastname.toLowerCase() < b.lastname.toLowerCase()) return 1;
                        return 0
                    }).map(( row, index ) => {
                        csv.push([row.lastname + ", " + row.firstname + " " + row.middlename.charAt(0) + "." ])
                        response.data.response ? response.data.response.map(( recs ) => {
                            csv[4+index+1].push(this.getIndex( row.id, recs.records) < 0 ? "-" : this.getStatus(this.getIndex( row.id, recs.records ), recs.records))
                        }) : null
                    }) : null

                    this.setState({ csvData: csv })
                }
            }
        })
        .catch( error => {
            if( this.mounted ) {
                this.setState({ loading: false, notFound: false })
            }
        })
    }
    filter = () => {
        this.retrieve()
    }
    componentWillUnmount() {
        this.mounted = false
    }

    getIndex = (id, jsonString) => {
        const json = JSON.parse(jsonString)
        const index = json.findIndex(( row ) => id == row.id)
        return index
    }

    getStatus = (index, jsonString) => {
        const json = JSON.parse(jsonString)[index]
        let ret = ""
        if( json.late != "" ) {
            ret = json.late
        }
        else if ( json.present ) {
            ret = "Present"
        } else {
            ret = "Absent"
        }
        return ret;
    }

    render() {
        const { fromdate, todate, students, records, loading, notFound, room, subj, csvData } = this.state
        const { history, classes } = this.props
        const paramsurl = this.props.match.params

        if( loading ) {
            return (
                <div>
                    <Header title={"Attendance Records"} user={this.props.user}/>
                    <LoadingScreen />
                </div>
            )
        }

        if( notFound ) {
            return (
                <div>
                    <Header title={"Students"} user={this.props.user}/>
                    <Content>
                        <Tpl title={"Attendance Record not Found"} img={require('./../img/material-ui-logo.svg')}>
                            <div>
                                <Typography paragraph>the attendance record that you are looking for was not found.</Typography>
                                <Button color={"primary"} 
                                color={"primary"} onClick={() => history.push("/tracks/" + paramsurl.tid + "/strands/" + paramsurl.sid + "/levels/" + paramsurl.lid + "/sections")} size={"small"}>Back to Section</Button>
                            </div>
                        </Tpl> 
                    </Content>
                </div>  
            )
        }

        return (
            <div>
             <Header title={"Attendance Records"} user={this.props.user}/>
             <Content>
                    <Typography align={"center"} style={{ textTransform: "uppercase", marginBottom: 20 }} variant={"h5"}>{subj[0].subjectname}</Typography>
                    <Typography align={"center"} style={{ textTransform: "uppercase", marginBottom: 20 }} variant={"h6"}>{subj[0].timein} - {subj[0].timeout}</Typography>
                    <Grid container spacing={16} style={{ marginBottom: "20px" }}>
                        <Grid item xs={3}>
                            <Buttonicon style={{ marginTop: 20 }} tooltip={"Back to Section"} color={"primary"} onClick={() => history.push("/tracks/" + paramsurl.tid + "/strands/" + paramsurl.sid + "/levels/" + paramsurl.lid + "/sections/" + paramsurl.id)}>
                                <KeyboardBackspace />
                            </Buttonicon>
                            <CSVLink data={csvData} style={{ marginLeft: 20 }}>
                                <Buttonicon style={{ marginTop: 20 }} tooltip={"Save to CSV"} color={"primary"}>
                                    <Save />
                                </Buttonicon>
                            </CSVLink>
                        </Grid>
                        <Grid item xs={3}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    margin="normal"
                                    label="From"
                                    variant={"outlined"}
                                    fullWidth
                                    value={fromdate}
                                    format={"yyyy-MM-dd"}
                                    onChange={(date) => this.handleDateChange("fromdate", date)}
                                />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    margin="normal"
                                    label="To"
                                    value={todate}
                                    variant={"outlined"}
                                    fullWidth
                                    format={"yyyy-MM-dd"}
                                    onChange={(date) => this.handleDateChange("todate", date)}
                                />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant={"contained"} color={"primary"} style={{ marginTop: 25 }} onClick={() => this.filter()}>Filter</Button>
                            </Grid>
                    </Grid>
                    {
                        students.length ? (
                            <Paper style={style.paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ minWidth: 250 }} align={"left"}></TableCell>
                                            {
                                                records.length ? records.map(( row ) => (
                                                    <TableCell style={{ minWidth: 70, whiteSpace: "nowrap" }} key={row.id} align={"center"}>{row.date_recorded}</TableCell>
                                                )) : null
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            students.length ? students.sort((a,b) => {
                                                if(a.lastname.toLowerCase() < b.lastname.toLowerCase()) return -1;
                                                if(a.lastname.toLowerCase() < b.lastname.toLowerCase()) return 1;
                                                return 0
                                            }).map(( row ) => (
                                                <TableRow hover key={row.id}>
                                                    <TableCell align={"left"} style={{ minWidth: 250, maxWidth: 250, position: "absolute", padding: 16, borderBottom: 0, backgroundColor: "#ffffff" }}>{row.lastname}, {row.firstname} {row.middlename.charAt(0)}.</TableCell>
                                                    {
                                                        records.length ? records.map(( recs ) => (
                                                            <TableCell key={recs.id} align={"center"}>
                                                            {
                                                                this.getIndex( row.id, recs.records) < 0 ? "-" : this.getStatus(this.getIndex( row.id, recs.records ), recs.records)
                                                            }
                                                            </TableCell>
                                                        )) : null
                                                    }
                                                </TableRow>
                                            )) : null
                                        }
                                    </TableBody>
                                </Table>
                            </Paper>
                        ) : (
                            <Tpl title={"There is no student."} img={require('./../img/material-ui-logo.svg')}>
                                <div>
                                    <Typography paragraph>Please add new student.</Typography>
                                </div>
                            </Tpl>
                        )
                    }
             </Content>
            </div>
        )
    }
} 

const style = {
    theadcol: {
        fontWeight: "800",
        fontSize: "14px"
    },
    paper: {
        marginTop: 10,
        width: '100%',
        overflowX: 'auto',
    }
}
const styles = theme => ({
    tableCell: {
        whiteSpace: 'nowrap'
    }
})

Records.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles( styles ) ( Records )