import React from "react"
import Input from "./../Input"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import { compose } from "redux"
import PropTypes from "prop-types"
class StudentsForm extends React.Component {
    render() {

        const { dataSource, handleChangeInput, classes } = this.props
        const { input, errors } = dataSource

        return (
        <div>
            <form style={{ flex: 1 }}>
            <Grid container spacing={16}>
            <Grid item lg={6}>
            <Typography className={classes.p} paragraph>Students Information.</Typography>
            <Input 
            value={input.firstname}
            label={"Firstname"}
            type={"text"}
            onChange={(e) => handleChangeInput(e)}
            name={"firstname"}
            />

            <Input 
            value={input.middlename}
            label={"Middlename"}
            type={"text"}
            onChange={(e) => handleChangeInput(e)}
            name={"middlename"}
            />

            <Input 
            value={input.lastname}
            label={"Lastname"}
            type={"text"}
            onChange={(e) => handleChangeInput(e)}
            name={"lastname"}
            />

            <Input 
            value={input.address}
            label={"Address"}
            type={"text"}
            onChange={(e) => handleChangeInput(e)}
            name={"address"}
            />

            <Input 
            value={input.contact}
            label={"Contact"}
            type={"text"}
            onChange={(e) => handleChangeInput(e)}
            name={"contact"}
            />
            </Grid>
            <Grid item lg={6}>
            <Typography className={classes.p} paragraph>Guardian Information.</Typography>
            <Input 
            value={input.guardian_name}
            label={"Guardian Name"}
            type={"text"}
            onChange={(e) => handleChangeInput(e)}
            name={"guardian_name"}
            />

            <Input 
            value={input.guardian_contact}
            label={"Guardian Contact"}
            type={"text"}
            onChange={(e) => handleChangeInput(e)}
            name={"guardian_contact"}
            />
            </Grid>
            </Grid>
            </form>
        </div>
        )
    }
}
StudentsForm.propTypes = {
    dataSource: PropTypes.object,
    handleChangeInput: PropTypes.func
}
const style = theme => ({
    p: {
        margin: "2px 0"
    }
})
export default compose(
    withStyles( style )
) (StudentsForm)