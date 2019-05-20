import React from "react"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper"
import Textsms from "@material-ui/icons/Textsms"
import Edit from "@material-ui/icons/Edit"
import Delete from "@material-ui/icons/Delete"
import Buttonicon from "./../Buttonicon"
import PropTypes from "prop-types"
const TrackList = ( props ) => {

    const { dataSource, onEdit, onRemove, onRedirect, isAdmin } = props

    const rooms = dataSource.length ? dataSource.map( (row, key ) => {
        return (
            <TableRow hover key={row.id}>
                <TableCell align={"left"} component="th" scope="row">{row.strands}</TableCell>
                <TableCell align={"right"}>
                    <Buttonicon tooltip={"Go to this Strand"} color={"primary"} onClick={() => onRedirect(row.id) }>
                        <Textsms />
                    </Buttonicon>
                    { isAdmin && (
                        <div style={{ display: "inline" }}>
                            <Buttonicon tooltip={"Edit"} color={"primary"} onClick={() => onEdit(key, row) }>
                                <Edit />
                            </Buttonicon>
                            <Buttonicon tooltip={"Remove"} color={"secondary"} onClick={() => onRemove(key, row.id)}>
                                <Delete />
                            </Buttonicon> 
                        </div>
                    ) }
                </TableCell>
            </TableRow>
        )
    }) : null

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={style.theadcol} align={"left"}>Strand name</TableCell>
                        <TableCell style={style.theadcol} align={"left"}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rooms}
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

TrackList.propTypes = {
    dataSource: PropTypes.any,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    loadMore: PropTypes.func,
    onRedirect: PropTypes.func,
    isAdmin: PropTypes.bool
}

export default TrackList