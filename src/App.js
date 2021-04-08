import React from "react";
import "jquery/src/jquery";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercises-list.component";
import EditExercises from "./components/edit-exercises.component";
import CreateExercises from "./components/create-exercises.component";
import CreateUser from "./components/create-user.component";
import "./App.css";

//after the router element use surround the inner element with a div element with class name container so you have the boostrap effect. with some margins on the sides

//install and import react-router-dom. rename to router and route.now we can create a route element called router and put everything inside of it.

//now  we are going to start building the app inside the router element. first we have a navbar, after we have several components. these components are each in a route element. when you enter the path specified/endpoint/route it will take you that particular component

//the path attribute is set to the endpoints. so React-router basically helps us to go to these components

//the navbar is on top and just like navbars it contains the li which when click will show each component

//now lets go to each component and create it

function App() {
	return (
		<Router>
			<div className="container">
				<Navbar />
				<br />
				<Route path="/" exact component={ExerciseList} />
				<Route path="/edit/:id" component={EditExercises} />
				<Route path="/create" component={CreateExercises} />
				<Route path="/user" component={CreateUser} />
			</div>
		</Router>
	);
}

export default App;
