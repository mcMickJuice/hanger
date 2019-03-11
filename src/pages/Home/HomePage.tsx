import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
	return (
		<div>
			<h1>Meal Plan Site</h1>
			<ul>
				<li>
					<Link to="/build">Build a Plan</Link>
				</li>
				<li>
					<Link to="/plan">See All Plans</Link>
				</li>
				<li>
					<Link to="/plan/34384hfds">Select a plan</Link>
				</li>
				<li>
					<Link to="/repositioning">Reorder feature (WIP)</Link>
				</li>
			</ul>
		</div>
	)
}

export default HomePage
