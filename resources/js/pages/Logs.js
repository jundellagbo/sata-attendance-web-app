import React from "react"
import Header from "./../components/Header"
import Content from "./../components/Content"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Search from "./../components/Search"
import Tpl from "./../components/Tpl"
import LoadingScreen from "./../components/LoadingScreen"
import Button from "@material-ui/core/Button"
import Table from "@material-ui/core/Table"
import CircularProgress from '@material-ui/core/CircularProgress';
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import Paper from "@material-ui/core/Paper"

import axios from "axios"
import { server_url, auth } from "./../env"

class Logs extends React.Component {
    constructor() {
        super()
        this.state = {
            search: "",
            loading: true,
            logs: [],
            page: 1,
            maxPage: 0,
            error: false,
            loadMore: false,
            searching: false
        }
        this.mounted = false
    }
    fetchLogs = async () => {
        this.setState({ loading: true })
        axios.get(server_url + "api/logs?page=1", auth)
        .then(response => {
            setTimeout(() => {
                this.setState({ page: 1, loading: false, logs: response.data.data, maxPage: response.data.last_page, searching: false })
            }, 200)
        })
        .catch(error => {
            this.setState({ loading: false, error: true })
        })
    }
    componentDidMount() {
        this.mounted = true;
        if( this.mounted ) {
            this.fetchLogs()
        }
    }
    componentWillUnmount() {
        this.mounted = false
    }
    loadingMore = () => {
        const newpage = parseInt(this.state.page+1)
        this.setState({ loadMore: true, page: newpage })
        axios.get(server_url + "api/logs?page=" + newpage, auth)
        .then(response => {
            setTimeout(() => {
                const copy = this.state.logs
                const retData = response.data.data
                retData.map((row) => copy.push(row))
                this.setState({ loadMore: false, logs: copy })
            }, 200)
        })
        .catch(error => {
            this.setState({ loadMore: false })
            console.log( error )
        })
    }
    search = () => {
        if(this.state.search != "") {
            this.setState({ searching: true })
        } else {
            this.fetchLogs()
        }
        axios.get(server_url + "api/logs/filter?filter=" + this.state.search, auth)
        .then(response => {
            this.setState({ logs: response.data.response })
        })
        .catch(error => {
            console.log( error )
        })
        this.setState({ search: "" })
    }
    render() {
        const { search, logs, loading, page, maxPage, loadMore, searching } = this.state
        
        const Logs = ( props ) => props.dataSource.length ? props.dataSource.map((row) =>
            <TableRow hover key={row.id}>
                <TableCell align={"left"}>{row.datelog}</TableCell>
                <TableCell align={"left"}>{row.logname}</TableCell>
            </TableRow>
        ) : null

        if( loading ) {
            return (
                <div>
                    <Header title={"Activity Log"} user={this.props.user}/>
                    <LoadingScreen />
                </div>
            )
        }

        return (
            <div>
            <Header title={"Activity Logs"} user={this.props.user}/>
            <Content>
                <Grid container spacing={16}>
                    <Grid item lg={4}></Grid>
                    <Grid item lg={4}>
                        <Search
                        value={search}
                        placeholder={"Enter date to filter."}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onSearch={() => this.search()}
                        />
                    </Grid>
                    <Grid item lg={4}></Grid>
                </Grid>

                {
                    logs.length ?
                    (
                        <Paper style={{ marginTop: 20 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={style.theadcol} align={"left"}>Date</TableCell>
                                        <TableCell style={style.theadcol} align={"left"}>Logs</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <Logs dataSource={logs} />
                                </TableBody>
                            </Table>
                        </Paper>
                    ) :
                    (
                        <Tpl title={"There is no logs"} img={require('./../img/material-ui-logo.svg')}>
                            <div>
                                <Typography paragraph>There is no logs available.</Typography>
                            </div>
                        </Tpl>
                    )
                }

                <div style={{ textAlign: "center", marginTop: 20 }}>
                    {
                        loadMore ? (<CircularProgress size={30} />) : null
                    }
                    {
                        page != maxPage && !searching ?
                        (
                            <div>
                            <Button
                            size={"small"} 
                            color={"primary"} 
                            variant={"contained"}
                            onClick={() => this.loadingMore()}>Load More</Button>
                            </div>
                        ) : null
                    }
                </div>

            </Content>
            </div>
        )
    }
}
const style = {
    theadcol: {
        fontWeight: "800",
        fontSize: "14px"
    }
}
export default Logs