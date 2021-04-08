import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

//this is just like the create exercise component. we could have also created a single component and update things based on props

//in the component did mount method, we are not going to get the exrecise object from our database but from the item clicked to edit/ up for edit

//we get the exercise id and then set the states withe the response.data

//this will populate the fields withe the response.data(s) we will also convert the date

//change the axios to read ('http://localhost:5000/exercises/'+this.props.match.param.id) and ('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise) for the get and post method resp.. 

//this.props.match.param.id: The library passes in a prop called match into every route that is rendered. Inside this match object is another object called params . This holds all matching params where the key is the name we specified when creating the route and the value is the actual value in the URL

//change the title and button text to edit exercise log
// i had to add another axios fxn to load the users

export class EditExercises extends Component {
    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            username: '',
            description: '',
            duration: '',
            date: new Date(),
            users: []
        }

         this.userInput = React.createRef();
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                })
            }
        })

        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
            .then(response => {               
                    this.setState({
                        username: response.data.username,
                        description: response.data.description,
                        duration: response.data.duration,
                        date: new Date(response.data.date)
                })
            
            })
           
        
        this.userInput.current.focus();
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

     onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

     
     onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

     onChangeDate(date) {
        this.setState({
            date: date
            
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
             username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise)
        axios
            .post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
            .then(response => {
            console.log(response.data);
            })

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref={this.userInput}
                            required
                            className="form-control custom-select"
                            value={this.state.username}
                        onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option key={user}
                                    value={user}>{user}
                                    </option>
                                })
                        }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                        
                    </div>

                    <div className="form-group">
                          <label>Duration (in minutes): </label>
                             <input type="text"
                            className="form-control"
                            placeholder = "0"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker 
                                selected={this.state.date}
                                onChange={this.onChangeDate}                               
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise" className="btn btn-dark"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditExercises