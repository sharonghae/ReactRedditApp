import React, { Component } from 'react';
import snoowrap from 'snoowrap';
import { Link } from 'react-router-dom';
import placeholder from './placeholder.png';

export default class AllPosts extends Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			currentPage: 1,
			postsPerPage: 5
		};
    this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {

		//TODO: move to json file and gitignore
		const r = new snoowrap({
		  userAgent: 'web:com.example.myredditapp:v1.2.3 (by /u/reactreddit)',
		  clientId: 'DR2YWrpKO1c7PA',
		  clientSecret: 'mtANycDxqiAAwlos0hVYLpgPbXA',
		  username: 'reactreddit',
		  password: 'password'
		});

		r.getHot()
			.map(post => {
				this.setState({ posts: this.state.posts.concat(post) });
				return post;
			})
			.then(post => console.log(post));
	}

	handleClick(e) {
		this.setState({ currentPage: Number(e.target.id)});
	}

	render() {
		const { posts, currentPage, postsPerPage } = this.state;

		//Logic for displaying posts
		const indexOfLastTodo = currentPage * postsPerPage;
		const indexOfFirstToDo = indexOfLastTodo - postsPerPage;
		const currentPosts = posts.slice(indexOfFirstToDo, indexOfLastTodo);

		const renderPosts = currentPosts.map((post, index) => {
			return (
				<div key={index} className="post">
					<div>{(index + 1)  + (postsPerPage * (currentPage - 1))}</div>
					<div>
						<a href={post.url}>
							<img 
								src={post.preview? post.thumbnail : placeholder} 
								className="thumbnail"
								alt=""
							/>
						</a>
					</div>
					<div>
						<a href={post.url}>{post.title}</a>
						<br />
						<Link 
							to={"/post/" + post.id} 
							className="comments-links"
						>
							{post.num_comments} comments
						</Link>
					</div>
				</div>
			)
		});

		//Logic for displaying page numbers
		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
			pageNumbers.push(i);
		}

		const renderPageNumbers = pageNumbers.map(number => {
			return (
				<li 
					key={number}
					id={number}
					className={(number === currentPage)? "active-page" : "inactive-page"}
					onClick={this.handleClick}
				>
					{number}
				</li>
			)
		});

		return (
			<div>
        <p className="App-intro">
          Hot Reddit Posts
        </p>
				<div id="posts">
					{renderPosts}
				</div>
				<ul id="page-numbers">
					{renderPageNumbers}
				</ul>
			</div>
		)
	}

}