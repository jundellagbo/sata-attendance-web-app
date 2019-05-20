import React from "react"
import Tpl from "./../components/Tpl"
import Content from "../components/Content"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
const Error = () => {
    return (
        <Content>
            <Tpl 
            img={require("./../img/material-ui-logo.svg")}
            title={"Session Timeout"}>
                <div>
                    <Typography paragraph>session has been timed out please login by clicking the button below.</Typography>
                    <Button
                    onClick={() => {
                        localStorage.removeItem("token")
                        window.location.href = "/login"
                    }}
                    color={"primary"}>
                        Login
                    </Button>
                </div>
            </Tpl>
        </Content>
    )
}
export default Error