import React from "react"
import { 
    withStyles
} from "@material-ui/core";
import { compose } from "redux"
import Content from "./../components/Content"
import Header from "./../components/Header"
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import Select from 'react-select';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import axios from "axios"
import { server_url, auth } from "./../env"
import Notif from "./../components/Notif"
class SendSms extends React.Component {
    constructor() {
        super()
        this.state = {
            multi: null,
            strandsVal: 'Select All Students',
            suggestions: [],
            strands: [],
            message: "",
            notif: {
              open: false,
              message: "",
              key: new Date().getTime()
            },
            loadSms: false
        }
        this.mounted = false
    }

    fetchMe = (id, fillup) => {
      axios.get(server_url+"api/attendance/sms/selections?id=" + id, auth)
        .then(response => {
          if( this.mounted ) {
            const strands = response.data.rooms.map(( row ) => ({
              value: row.id,
              label: row.roomname
            }))
            
            const suggestions = response.data.students.map(( row ) => ({
              value: row.id,
              label: row.lastname + ", " + row.firstname + " " + row.middlename.charAt(0) + ".",
              contact: row.guardian_contact
            }))

            const setup = { value: "all", label: "Select all students" }
            strands.unshift( setup )
            
            this.setState({ strands, suggestions })

            if( fillup ) {
              this.setState({ multi: suggestions })
            }
          }
        })
        .catch( error => {
          if( this.mounted ) {
            this.notif("Fetching sections and students error.")
          }
        })
    }

    componentDidMount() {
        this.mounted = true
        this.fetchMe("all", false)
    }
    notif = message => {
      this.setState({
        notif: { key: new Date().getTime(), message, open: true }
      })
    }
    componentWillUnmount() {
        this.mounted = false
    }
    handleChange = name => value => {
        this.setState({
          [name]: value,
        });
      }
    roomSelect = name => value => {
      this.setState({
        [name]: value
      })
      this.fetchMe( value.value, true )
    }
    validate = () => {
      const multi = this.state.multi
      const message = this.state.message
      let ret = ""
      if( !multi || multi.length == 0 ) {
        ret = "Please select recepient"
      } else if( message == "" ) {
        ret = "Please enter message"
      } else {
        ret = ""
      }
      return ret;
    }
    sending = () => {
      this.setState({ loadSms: true })
      const multi = this.state.multi
      const message = this.state.message
      if( this.validate() != "" ) {
        this.notif(this.validate())
        this.setState({ loadSms: false })
      } else {
        let numbers = ""
        multi.map(( row ) => {
          numbers += row.contact + ","
        })

        axios.post(server_url + "api/attendance/sms/send/updates", {number: numbers, message}, auth)
        .then( response => {
          this.notif("Message has been sent!")
          this.reset()
        })
        .catch( error => {
          this.notif("Error when sending message")
        })
      }
    }
    reset = () => {
      this.setState({ message: "", multi: null, loadSms: false })
    }
    render() {
        const { classes, theme } = this.props
        const {notif, loadSms} = this.state
        const selectStyles = {
            input: base => ({
              ...base,
              color: theme.palette.text.primary,
              '& input': {
                font: 'inherit',
              },
            }),
          };

        return (
            <div>
            <Header title={"Send SMS"} user={this.props.user}/>
            <Content>
            <Grid container spacing={16} style={{ marginBottom: "20px" }}>
                <Grid item xs={8}>
                  <NoSsr>
                      <Select
                      classes={classes}
                      styles={selectStyles}
                      textFieldProps={{
                      InputLabelProps: {
                          shrink: true,
                      },
                      }}
                      options={this.state.suggestions}
                      components={components}
                      value={this.state.multi}
                      onChange={this.handleChange('multi')}
                      placeholder="Select Recipient"
                      isMulti
                  />
                  </NoSsr>
                </Grid>
                <Grid item xs={4}>
                  <NoSsr>
                        <Select
                        classes={classes}
                        styles={selectStyles}
                        textFieldProps={{
                          InputLabelProps: {
                              shrink: true,
                          },
                        }}
                        options={this.state.strands}
                        components={components}
                        value={this.state.strandsVal}
                        onChange={this.roomSelect('strandsVal')}
                        placeholder="Choose Section"
                    />
                    </NoSsr>
                </Grid>
            </Grid>
            <TextField
            placeholder="Enter your Message"
            multiline={true}
            rows={10}
            rowsMax={100}
            fullWidth
            value={this.state.message}
            onChange={(event) => this.setState({ message: event.target.value })}
            variant={"outlined"}
            style={{ marginTop: 30 }}
            />
            <div style={{ marginTop: 30 }}>
                {
                  loadSms ? (<CircularProgress />) : (<Button variant={"contained"} color={"primary"} onClick={() => this.sending()}>Send SMS</Button>)
                }
            </div>
            <Notif 
            open={notif.open}
            message={notif.message}
            key={notif.key}
            onClose={() => this.setState({ notif: { open: false, message: ""} })}
            />
            </Content>
            </div>
        )
    }
}
const styles = theme => ({
    input: {
        display: 'flex',
        padding: 0,
      },
      valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
      },
      chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
      },
      chipFocused: {
        backgroundColor: emphasize(
          theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
          0.08,
        ),
      },
      noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      },
      singleValue: {
        fontSize: 16,
      },
      placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
      },
      paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
      },
      divider: {
        height: theme.spacing.unit * 2,
      },
})

SendSms.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  

  function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  
  function Control(props) {
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }
  
  function Option(props) {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
  
  function Placeholder(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  function MultiValue(props) {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={classNames(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }
  
  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }
  
  const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    ValueContainer,
  };

export default compose(
    withStyles( styles, { withTheme: true } )
) ( SendSms )