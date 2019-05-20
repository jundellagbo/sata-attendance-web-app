import React from "react";
import PropTypes from "prop-types";

// import { connect } from "react-redux"

import { 
    withStyles
} from "@material-ui/core";

const styles = theme => ({
    /* ... use of custom styling */
});

class Template extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div>
                Template
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
}

// const mapStateToProps = state => {
//     return {
//         user: state
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         addNumber: (number) => {
//             dispatch({
//                 type: "ADD",
//                 payload: number
//             })
//         }
//     }
// }

// export default connect( mapStateToProps, mapDispatchToProps ) (withStyles( styles ) ( Home ))

export default withStyles( styles ) ( Template )