import React, { Component } from "react";
import { Link } from "react-router-dom";

//use link from react-router-dom to create links to navigate the navbar
export class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link to="/" className="navbar-brand">
					My Exercise Tracker
				</Link>

				<button
					type="button"
					className="navbar-toggler navbar-toggler-left"
					data-toggle="collapse"
					data-target="#navbarCollapse"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarCollapse">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								Exercises
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/create" className="nav-link">
								Create Exercise Log
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/user" className="nav-link">
								Create user
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;
