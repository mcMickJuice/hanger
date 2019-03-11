import React from 'react'
import { Link } from 'react-router-dom'
import BigLink from '../../shared/BigLink'

const HomePage = () => {
	return (
		<div>
			<h1>Meal Plan Site</h1>

			<BigLink to="/build">Build a Plan</BigLink>

			<BigLink to="/plan">See All Plans</BigLink>

			<BigLink to="/repositioning">Reorder feature (WIP)</BigLink>
		</div>
	)
}

export default HomePage
