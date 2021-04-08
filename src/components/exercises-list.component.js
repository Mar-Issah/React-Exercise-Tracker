import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ExercisesList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			exercises: [],
		};
	}

	//once the component mounts get the list of all the exercises and diplay
	componentDidMount() {
		axios
			.get("http://localhost:5000/exercises/")
			.then((response) => {
				this.setState({
					exercises: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	//for the delete button
	deleteExercise(id) {
		this.setState({
			exercises: this.state.exercises.filter((el) => el._id !== id),
		});
	}

	render() {
		return (
			<div>
				<h3>Logged Exercises</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{this.state.exercises.map((exercise) => {
							return (
								<tr key={exercise._id}>
									<td>{exercise.username}</td>
									<td>{exercise.description}</td>
									<td>{exercise.duration}</td>
									<td>{exercise.date.substring(0, 10)}</td>
									<td>
										<Link to={"/edit/" + exercise._id}>edit</Link>| |
										<a
											href="###"
											className="text-danger"
											onClick={() => {
												this.deleteExercise(exercise._id);
											}}
										>
											delete
										</a>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ExercisesList;
