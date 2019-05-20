import React from "react"
import { withRouter } from "react-router-dom"
import { compose } from "redux"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Tpl from "./Tpl"
const NotFound = ( props ) => {
    const { history } = props
    return (
        <Tpl title={"404 Not Found"} img={require('./../img/material-ui-logo.svg')}>
            <div>
                <Typography paragraph>The page that you are looking for was not found.</Typography>
                <Button color={"primary"} 
                onClick={() => history.push("/")} style={{ marginRight: "10px" }} size={"small"} variant={"contained"}>Back to Home</Button>
            </div>
        </Tpl>  
    )
}
export default compose(
    withRouter
) (NotFound)