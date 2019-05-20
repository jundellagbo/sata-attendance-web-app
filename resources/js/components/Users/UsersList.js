import React from "react"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper"
import Edit from "@material-ui/icons/Edit"
import LockOpen from "@material-ui/icons/LockOpen"
import Delete from "@material-ui/icons/Delete"
import Buttonicon from "./../Buttonicon"
import PropTypes from "prop-types"
const UserList = ( props ) => {

    const { dataSource, onEdit, onRemove, changePass } = props

    const verifiedUsers = dataSource.length ? dataSource.map( (row, key ) => {
        return (
            <TableRow hover key={row.id}>
                <TableCell align={"left"} component="th" scope="row">{row.firstname} {row.middlename} {row.lastname}</TableCell>
                <TableCell align={"left"}>{row.username}</TableCell>
                <TableCell align={"left"}>{row.email}</TableCell>
                <TableCell align={"left"}>{row.role == 1 ? "Administrator" : "User"}</TableCell>
                <TableCell align={"right"} style={{ width: 150 }}>
                    <Buttonicon tooltip={"Change Password"} color={"primary"} onClick={() => changePass(row.id) }>
                        <LockOpen />
                    </Buttonicon>
                    <Buttonicon tooltip={"Edit"} color={"primary"} onClick={() => onEdit(row, key) }>
                        <Edit />
                    </Buttonicon>
                    <Buttonicon tooltip={"Remove"} color={"primary"} onClick={() => onRemove(row.id, key)}>
                        <Delete />
                    </Buttonicon>
                </TableCell>
            </TableRow>
        )
    }) : null

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={style.theadcol} align={"left"}>Fullname</TableCell>
                        <TableCell style={style.theadcol} align={"left"}>Username</TableCell>
                        <TableCell style={style.theadcol} align={"left"}>Email</TableCell>
                        <TableCell style={style.theadcol} align={"left"}>Roles</TableCell>
                        <TableCell style={style.theadcol} align={"center"}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {verifiedUsers}
                </TableBody>
            </Table>
        </Paper>
    )
}

const style = {
    theadcol: {
        fontWeight: "800",
        fontSize: "14px"
    }
}

UserList.propTypes = {
    dataSource: PropTypes.any,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    changePass: PropTypes.func
}

export default UserList