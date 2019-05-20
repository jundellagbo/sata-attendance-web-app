import React from "react"
import PropTypes from "prop-types"
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import Buttonicon from "./Buttonicon"
class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            onsearch: false
        }
    }
    render() {
        const { placeholder, onSearch, onChange, value } = this.props
        const { onsearch } = this.state
        return (
            <Paper style={styles.root} elevation={1}>
             <InputBase disabled={onsearch ? true : false} style={styles.input} onChange={onChange} value={value} placeholder={placeholder} />
             <Buttonicon style={styles.iconButton} tooltip={!onsearch ? "Search" : "Undo"} onClick={() => {
                 this.setState({ onsearch: !this.state.onsearch });
                 onSearch()
             }}>
                { !onsearch ? (<SearchIcon />) : (<Close />) }
            </Buttonicon>
         </Paper>
        )
    }
}
Search.propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string
}
const styles = {
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
}
export default Search