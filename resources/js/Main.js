import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "redux"
import Home from "./pages/Home"
import Users from "./pages/Users"
import Tracks from "./pages/Tracks"
import Strands from "./pages/Strands"
import Levels from "./pages/Levels"
import Rooms from "./pages/Rooms"
import Logs from "./pages/Logs"
import Login from "./pages/Login"
import Register from "./pages/Register"
import RoomSingle from "./pages/RoomSingle"
import Records from "./pages/Records"
import SendSms from "./pages/SendSms"
import NotFound from "./pages/NotFound"
import { user, server_url, auth } from "./env"
import axios from "axios"
import { withRouter } from "react-router-dom"
import Typography from '@material-ui/core/Typography';

class Main extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            user_data: [],
            loading: true
        }
        this.mounted = false
    }

    async fetchdata() {
        const e = this
        axios.get(server_url + "api/auth/user", auth)
        .then(( response ) => {
            setTimeout(() => {
                e.setState({
                    loading: false,
                    user_data: response.data.success
                })
            }, 1000)
        })
        .catch(( err ) => {
            if( user ) {
                localStorage.removeItem("token")
                window.location.href="/login"
                e.setState({ loading: false })
            }
        })
    }

    componentDidMount() {
        const e = this
        this.mounted = true
        if( this.mounted ) {
            if( user ) {
                e.fetchdata()
            } else {
                e.setState({ loading: false })
            }
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    render() {

        const { loading, user_data } = this.state

        const PrivateRoute = ({ component: Component, ...rest }) => (<Route {...rest} render={(props) => (
                user ? <Component user={user_data} {...props} /> : <Redirect to={"/login"} />
            )} />
        )
        const UnauthorizedRoute = ({ component: Component, ...rest }) => (<Route {...rest} render={(props) => (
            user ? <Redirect to={"/"} /> : <Component {...props} />
            )} />
        )

        const Loading = () => {
            return (
                <div style={ls.wrap}>
                    <div>
                        <img style={{ width: 100 }} src={require("./img/material-ui-logo.svg")} />
                        <Typography style={{ color: "#00AFFD", marginTop: 15, fontWeight: "500", fontSize: 18 }} paragraph>Attendance Application</Typography>
                    </div>
                </div>
            )
        }

        if( loading ) {
            return (
                <Loading />
            )
        }

        return (
            <div>
                <Switch>
                    <UnauthorizedRoute path={"/login"} exact component={Login} />
                    <UnauthorizedRoute path={"/register"} exact component={Register} />
                    <PrivateRoute title={"Home"} path={"/"} exact component={Home} />
                    <PrivateRoute path={"/users"} exact component={Users} />
                    <PrivateRoute path={"/tracks"} exact component={Tracks} />
                    <PrivateRoute path={"/tracks/:id/strands"} exact component={Strands} />
                    <PrivateRoute path={"/tracks/:id/strands/:sid/levels"} exact component={Levels} />
                    <PrivateRoute path={"/tracks/:tid/strands/:sid/levels/:lid/sections"} exact component={Rooms} />
                    <PrivateRoute path={"/tracks/:tid/strands/:sid/levels/:lid/sections/:id"} exact component={RoomSingle} />
                    <PrivateRoute path={"/tracks/:tid/strands/:sid/levels/:lid/sections/:id/records/:subject"} exact component={Records} />
                    <PrivateRoute path={"/logs"} exact component={Logs} />
                    <PrivateRoute path={"/sms"} exact component={SendSms} />
                    <PrivateRoute path={"*"} exact component={NotFound} />
                </Switch>
            </div>
        )
    }
}

const ls = {
    wrap: {
        textAlign: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: -1
    }
}

const styles = theme => ({
    
})

export default compose(
    withRouter,
    withStyles( styles )
)(Main)