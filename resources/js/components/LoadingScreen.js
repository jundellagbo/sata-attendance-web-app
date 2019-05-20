import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { compose } from "redux"
const LoadingScreen = (props) => {
    const { classes } = props
    return (
        <div className={classes.loadingWrap}>
            <div>
                <CircularProgress className={classes.progress} size={50} />
                <Typography paragraph>Please wait</Typography>
            </div>
        </div>
    )
}
LoadingScreen.propTypes = {
    classes: PropTypes.object
}
const styles = theme => ({
    progress: {
        marginBottom: 10
    },
    loadingWrap: {
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
})
export default compose( withStyles( styles ) )( LoadingScreen )