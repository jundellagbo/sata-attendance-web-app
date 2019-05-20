import React from "react";
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
class Register extends React.Component {
    render() {
        const { history } = this.props
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '100vh' }}>
                <div>
                    <Typography style={{ fontWeight: 900, fontSize: 50 }}>404 Not Found</Typography><br/>
                    <Typography>The page that you are looking for was not found.</Typography><br/>
                    <Button color={"primary"} onClick={() => history.push("/")}>Back to Home</Button>
                </div>
            </div>
        );
    }
}
const styles = theme => {

}
export default withStyles( styles ) ( Register )