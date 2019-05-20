import React from "react"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import PropTypes from "prop-types"
const Confirmation = (props) => {
    const {dataSource, onApprove, onDecline} = props
    const confirmationList = dataSource.length ? dataSource.map( (row, key ) => {
        return (
            <TableRow hover key={row.id}>
                <TableCell align={"left"} component="th" scope="row">{row.firstname} {row.middlename} {row.lastname}</TableCell>
                <TableCell align={"left"}>{row.username}</TableCell>
                <TableCell align={"left"}>{row.email}</TableCell>
                <TableCell align={"left"}>{row.contact}</TableCell>
                <TableCell align={"right"}>
                    <Button 
                    onClick={() => onApprove(key, row.id)} 
                    color={"primary"} variant={"contained"} 
                    style={{...classes.btnxs, marginRight: "8px" }} 
                    size={"small"}>
                        Approve
                    </Button>
                    <Button 
                    onClick={() => onDecline(key, row.id)} 
                    color={"secondary"} 
                    variant={"contained"} 
                    style={classes.btnxs} 
                    size={"small"}>
                        Decline
                    </Button>
                </TableCell>
            </TableRow>
        )
    }) : null

    return(
        <Paper style={classes.tblWrap}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={classes.theadcol} align={"left"}>Fullname</TableCell>
                        <TableCell style={classes.theadcol} align={"left"}>Username</TableCell>
                        <TableCell style={classes.theadcol} align={"left"}>Email</TableCell>
                        <TableCell style={classes.theadcol} align={"left"}>Contact</TableCell>
                        <TableCell style={classes.theadcol} align={"center"}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {confirmationList}
                </TableBody>
            </Table>
        </Paper>
    )
}
const classes = {
    theadcol: {
        fontWeight: "800",
        fontSize: "14px"
    },
    btnxs: {
        fontSize: "11px",
        marginTop: "10px",
        marginBottom: "10px"
    },
    tblWrap: {
        marginBottom: "20px"
    },
}
Confirmation.propTypes = {
    dataSource: PropTypes.any,
    onApprove: PropTypes.func,
    onDecline: PropTypes.func
}
export default Confirmation