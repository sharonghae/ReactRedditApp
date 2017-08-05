import React, { Component } from 'react';
import snoowrap from 'snoowrap';
import placeholder from './placeholder.png';
import Comments from './Comment';

export default class Post extends Component {
	constructor() {
		super();
		this.state = {
			submission: {}
		}		
	}

	componentDidMount() {
		const r = new snoowrap({
			userAgent: 'web:com.example.myredditapp:v1.2.3 (by /u/reactreddit)',
			clientId: 'DR2YWrpKO1c7PA',
			clientSecret: 'mtANycDxqiAAwlos0hVYLpgPbXA',
			username: 'reactreddit',
			password: 'password'
		});

		r.getSubmission(this.props.match.params.id)
			.fetch()
			.then(submission => {
				this.setState({ submission });
				console.log(this.state.submission)
			});

	}

	render() {
		const { submission } = this.state;

		return(
			<div>
        <p className="App-intro">
        	Post
        </p>
				<div className="submission">
					<div>
						<a href={submission.url}>
							<img 
								src={submission.preview? submission.thumbnail : placeholder} 
								className="thumbnail"
								alt=""
							/>
						</a>
					</div>
					<div>
						<a href={submission.url}>{submission.title}</a>
					</div>
				</div>
        <p className="App-intro">
          Comments
        </p>
        <div className="comments-container">
        	<Comments comments={submission.comments} background={true} />
				</div>
			</div>
		)
	}
}