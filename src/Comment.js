import React, { Component } from 'react';

export default class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			background: this.props.background
		}
	}

	render() {
		const { comments } = this.props;
		const { background } = this.state;

		return (
    	<div>
    		{comments && comments.map((comment, index) => 
    			<div key={index} className={background? "comments-list" : "comments-list2"}>
    				<a 
    					href={"https://www.reddit.com/user/" + comment.author.name}
    					className="user">{comment.author.name}
  					</a>
    				<p>{comment.body}</p>
    				{comment.replies && <Comments comments={comment.replies} background={!background} />}
    			</div>
        )}
  		</div>
		)
	}
}

