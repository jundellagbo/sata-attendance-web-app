import React from "react"
import LinearProgress from "@material-ui/core/LinearProgress"
const Loader = ( props ) => {
    const { loading } = props
    return (
        <LinearProgress style={ loading ? style.loading : style.unload } />
    )
}
const style = {
    loading: {
        opacity: 1
    },
    unload: {
        opacity: 0
    },
}
export default Loader