import React, { Component } from 'react';
import Calendar from './AdvoCalendar'
import person from '../img/icon2.png';
import { PersonalSelect, SpaceSelect} from '../Select'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { DateFormatInput } from 'material-ui-next-pickers'

// confirm host view
import HostInfo from './HostInfo';
import { Host } from '../filter';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    bodyText: {
        color: '#202e57'
    },
    side: {
      height: window.outerHeight,
      width: window.innerWidth / 4 + 100,
      padding: '2rem'
    }, 
    hosts: {
        height: window.outerHeight,
        width: window.innerWidth / 2 + 230,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    card: {
        width: 400,
        margin: "0rem 5rem 1rem 3rem",
        border: "0.5px solid #d3dbee",
        boxShadow: "none",
        fontFamily: 'Source Sans Pro',
        borderRadius: "12px"
    },
    content: {
        display: "flex",
        //margin: '20px',
        alignItems: 'center'
    },

    button: {
        margin: theme.spacing.unit,
        textTransform: "none"
    },
    avatar: {
        width: "100px",
        height: "100px",
        margin: '10px'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit,
    },
    select: {
        width: "150px"
    },
    floatingLabelFocusStyle: {
        color: "#da5c48"
    }
});

const locations = ["Northgate", "U District", "Westlake", "Ballard"]

export default withStyles(styles)(class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "list",
            guests: "",
            locations: "",
            start: new Date()
        }
    }

    componentDidMount() {
        // const api = "http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=<ZWSID>&state=wa&city=seattle&childtype=neighborhood"
        // const api = "https://pokeapi.co/api/v2/pokemon/ditto/"

        // fetch(api)
        //     .then(
        //         data => console.log(data.abilities)
        //     )
        //     .catch(

        //     )
    }


    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
      };

    handleHost = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleSwitchView = (event) => {
        this.setState({
            view: event.target.checked ? "calendar" : "list"
        })
    }
    
    onChangeDate = (date) => {
        console.log('Date: ', date)
        this.setState({date: date})
    } 

    convertToDate = (start, end) => {
        var start = new Date(start);
        var end = new Date(end);
        return {
            start: moment(start.toLocaleString()).format("MMMM DD"),
            end: moment(end.toLocaleString()).format("MMMM DD")
        };
    }

    render() {
        const { classes } = this.props;
        const {start, end} = this.state;
        let date = '';
        return (
            <div class="pt-4">
                <Grid 
                    container 
                    className={classes.root} 
                    justify="space-evenly" >
                        <Grid key={1} item>
                                <Paper className={classes.side} style={{boxShadow: "none", border:"0.5px solid #d3dbee", backgroundColor: "#fdfdfe", borderRadius: "12px"}} >
                                <Link to="/advocate/currentbookings">
                                    <p id="back"> &#60; Back</p>
                                </Link>
                                    <h3 class="mb-4">SEARCH BOOKINGS</h3>
                                    <form>
                                    <FormControl>                                      
                                        <div style={{display: "flex"}}>
                                            <div>
                                            Start Date
                                                <DateFormatInput 
                                                    name='date-input' 
                                                    value={start} 
                                                    onChange={(date) => this.setState({start: date, end: date})}
                                                    min={new Date()}
                                                />
                                            </div>
                                            <div>
                                                End Date
                                            <DateFormatInput 
                                                name='date-input' 
                                                value={end} 
                                                onChange={(date) => this.setState({end: date})}
                                                min={start}
                                            />
                                            
                                            </div>
                                            
                                        </div>
                                        <div style={{display: "flex", marginBottom: "10px"}}>
                                            <FormControl className={classes.select} style={{flexGrow: 1, marginRight: "20px"}}>
                                                <InputLabel  htmlFor="select-multiple-checkbox"># of Guests</InputLabel>
                                                <Select
                                                value={this.state.guests}
                                                onChange={this.handleInputChange('guests')}
                                                input={<Input name="age" id="age-helper" />}
                                                >                                
                                                    {[1,2,3,4, 5, 6].map(option => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl className={classes.select} style={{flexGrow: 1}}>
                                                <InputLabel htmlFor="select-multiple-checkbox">Location</InputLabel>
                                                <Select
                                                value={this.state.locations}
                                                onChange={this.handleInputChange('locations')}>                                        >
                                                    {locations.map(option => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        
                                        <Grid containter space={6}>
                                            <Grid item xs={12}>
                                                <div>
                                                    <PersonalSelect></PersonalSelect>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <SpaceSelect ></SpaceSelect>
                                        <input type="search" placeholder="Search" class="mt-3 mb-3"></input>
                                        <div style={{display: "flex", justifyContent:"space-between"}}>
                                        <Link to="/currentbookings">
                                            <Button variant="contained" color="primary" className={classes.button} id="buttonGray" style={{fontSize: "16px", padding:"0px 45px 0px 45px", height:"40px"}}>
                                                Cancel
                                            </Button>
                                        </Link>
                                            <Button variant="contained" color="primary" className={classes.button} id="button" style={{fontSize: "16px", padding:"0px 22px 0px 22px", height:"40px"}}>
                                                Search Hosts
                                            </Button>
                                        </div>  
                                    </FormControl>

                                    </form>
                                    
                                </Paper>
                        </Grid>
                        <Grid key={2} item>
                            <Paper className={classes.hosts} style={{boxShadow: "none", border:"0.5px solid #d3dbee", backgroundColor: "#fdfdfe", borderRadius: "12px"}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', padding: '30px'}}>
                                    <h3 class="mt-4">
                                        AVAILABLE BOOKINGS
                                    </h3>
                                    <div>
                                        Show Calendar
                                        <Switch value="view" onChange={this.handleSwitchView}/>
                                    </div>
                                </div>
                            {this.state.view == "list" ? 
                                <Grid container spacing={6}>
                                    {Host.map(
                                        (booking) => {
                                            date = this.convertToDate(booking.space[0].availability[0].start, booking.space[0].availability[0].end)
                                            return(
                                                <Card className={classes.card}>
                                                    <CardContent>
                                                        <div className={classes.content}>
                                                            <img className={classes.avatar} src={person}></img>
                                                            <div>
                                                                <h5 style={{color: "#202e57", marginBottom: 0}}>
                                                                    {booking.information.name}
                                                                </h5>
                                                                <Typography style={{color: "#da5c48"}} className={classes.bodyText}>
                                                                    {booking.space[0].location}
                                                                </Typography>
                                                                <Typography className={classes.bodyText}>
                                                                    {booking.space[0].homeType}
                                                                </Typography>
                                                            </div>      
                                                        </div>  
                                                        
                                                        {/* click on date to trigger HostInfo dialog */}
                                                        <Button id='button-outline-date' onClick={this.handleHost} variant="outlined">                                                  
                                                        {date.start} - {date.end}
                                                        </Button>      
                                                        <HostInfo booking={booking} open={this.state.open} click={this.handleHost}></HostInfo>    

                                                        {/* space info display */}
                                                        <p style={{marginBottom: 0, marginTop: "10px", fontSize: "14px"}}>Amenities:</p>
                                                        <div style={{display: 'flex', flexWrap: 'wrap', margin: '5px'}}>
                                                            {
                                                                booking.space[0].amenities.map((amenity) => {
                                                                    return(
                                                                        <div 
                                                                            id="tags"
                                                                            style={{
                                                                                border: "0.5px solid",
                                                                                borderRadius: '0.5rem',
                                                                                padding: '4px 12px 4px 12px',
                                                                                margin: '2px'
                                                                            }}
                                                                        >
                                                                            {amenity}
                                                                        </div>
                                                                    )
                                                                })
                                                            }      
                                                        </div>                             
                                                    </CardContent>
                                                </Card>
                                            )
                                        }
                                    )}
                                </Grid> 
                            : <Calendar></Calendar>}
                            </Paper>
                        </Grid>
                </Grid>
            </div>       
        )
    }
})
