import React, { Component } from "react";
import axios from "axios";

export class CreateUser extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: "",
		};

		this.userInput = React.createRef();
	}

	// when component mounts place focus on the username input
	componentDidMount() {
		this.userInput.current.focus();
	}
	onChangeUsername(e) {
		this.setState({
			username: e.target.value,
		});
	}

	//on submit add the user
	onSubmit(e) {
		e.preventDefault();

		const user = {
			username: this.state.username,
		};

		axios
			.post("http://localhost:5000/users/add", user)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});

		this.setState({
			username: "",
		});
	}

	render() {
		return (
			<div>
				<h3>Create New User</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<input
							ref={this.userInput}
							type="text"
							required
							className="form-control"
							value={this.state.username}
							onChange={this.onChangeUsername}
						/>
					</div>

					<div className="form-group">
						<input
							type="submit"
							value="Create New User"
							className="btn btn-dark"
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default CreateUser;
