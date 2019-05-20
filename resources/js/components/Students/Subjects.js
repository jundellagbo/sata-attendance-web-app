import React from "react"
import Input from "./../Input"
import InputIcon from "./../InputIcon"
import AddCircle from "@material-ui/icons/AddCircle"
import Create from "@material-ui/icons/Create"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import PropTypes from "prop-types"
import Delete from "@material-ui/icons/Delete"
import Assessment from "@material-ui/icons/Assessment"
import Buttonicon from "./../Buttonicon"
import Edit from "@material-ui/icons/Edit"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

class Subjects extends React.Component {
    render() {
        const { input, onPress, changeTxt, dataSource, onEdit, onRemove, cancelEdit, loading, onRecord } = this.props
        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item lg={12}>
                    <Input
                    label={"Subject Name"}
                    type={"text"}
                    value={input.subjectname}
                    onChange={(e) => changeTxt(e)}
                    name={"subjectname"}
                    icon={{
                        endAdornment: (
                            <InputIcon 
                            position={"end"}
                            tooltip={input.id!=0?"Save Subject":"Add Subject"}
                            onClick={onPress}
                            >
                                {input.id != 0 ? (<Create/>) : (<AddCircle/>) }
                            </InputIcon>
                        )
                    }}
                    />
                    </Grid>

                    <Grid item lg={6} style={{ marginTop: -20 }}>
                    <Input
                    label={"Timein"}
                    type={"text"}
                    value={input.timein}
                    onChange={(e) => changeTxt(e)}
                    name={"timein"}
                    />
                    </Grid>
                    <Grid item lg={6} style={{ marginTop: -20 }}>
                    <Input
                    label={"Timeout"}
                    type={"text"}
                    value={input.timeout}
                    onChange={(e) => changeTxt(e)}
                    name={"timeout"}
                    />
                    </Grid>
                    <div style={{ width: "100%", margin: "0 10px 10px 10px" }}>
                    {
                        input.id != 0 ? (<Button style={{ float: "right" }} color={"primary"} size={"small"} onClick={cancelEdit}>Cancel Edit</Button>) : null
                    }
                    </div>
                </Grid>
                {
                    loading ? (<div style={{ textAlign: "center", marginTop: 20 }}><CircularProgress /></div>) :  dataSource.length ? (
                        <Paper style={{ marginTop: 10 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={style.theadcol} align={"left"}>Subjects</TableCell>
                                        <TableCell style={style.theadcol} align={"left"}>Time</TableCell>
                                        <TableCell style={style.theadcol} align={"left"}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <SubjectsList 
                                    dataSource={dataSource} 
                                    onEdit={(row, key) => onEdit(row,key)} 
                                    onRemove={(id, key) => onRemove(id,key)}
                                    onRecord={(id) => onRecord(id)}
                                    />
                                </TableBody>
                            </Table>
                        </Paper>
                    ) : (
                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <Typography paragraph>Subject is empty</Typography>
                        </div>
                    )
                }
            </div>
        )
    }
}
Subjects.propTypes = {
    input: PropTypes.object,
    id: PropTypes.number,
    onPress: PropTypes.func,
    changeTxt: PropTypes.func,
    dataSource: PropTypes.any,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onRecord: PropTypes.func,
    cancelEdit: PropTypes.func,
    loading: PropTypes.bool
}

const SubjectsList = (props) => props.dataSource.length ? (
    props.dataSource.map(( row, key ) => (
        <TableRow hover key={row.id}>
            <TableCell align={"left"}>{row.subjectname}</TableCell>
            <TableCell align={"left"}>{row.timein} - {row.timeout}</TableCell>
            <TableCell align={"left"}>
            <Buttonicon tooltip={"Attendance Records"} color={"primary"} onClick={() => props.onRecord(row.id) }>
                <Assessment />
            </Buttonicon>
            <Buttonicon tooltip={"Edit"} color={"primary"} onClick={() => props.onEdit(row, key) }>
                <Edit />
            </Buttonicon>
            <Buttonicon tooltip={"Remove"} color={"primary"} onClick={() => props.onRemove(row.id, key)}>
                <Delete />
            </Buttonicon>
            </TableCell>
        </TableRow>
    ))
) : null

const style = {
    theadcol: {
        fontWeight: "800",
        fontSize: "14px"
    }
}
export default Subjects