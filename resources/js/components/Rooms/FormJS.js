import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "redux"
import Typography from "@material-ui/core/Typography"
import Input from "../Input"
class FormJS extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { dataSource, handleChangeInput, placeholder, inputname, value } = this.props
        const { input } = dataSource
        return(
            <div>
                <Typography paragraph>please fill out the form below.</Typography>
                <form style={{ flex: 1 }}>
                <Input 
                value={value}
                label={placeholder}
                type={"text"}
                onChange={(e) => handleChangeInput(e)}
                name={inputname}
                />
                </form>
            </div>
        )
    }
}
FormJS.propTypes = {
    dataSource: PropTypes.object,
    handleChangeInput: PropTypes.func,
    placeholder: PropTypes.string,
    inputname: PropTypes.string,
    value: PropTypes.string
}
const style = theme => ({})
export default compose(
    withStyles(style)
)(FormJS)