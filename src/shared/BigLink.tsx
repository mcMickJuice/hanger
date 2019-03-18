import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

interface Props {
	to: string
	children: React.ReactNode
}

const styles = {
	padding: '8px 0'
}

// make links big and easily clickable on mobile
// this could prob be accomplished using normal css...
const BigLink = ({ to, children }: Props) => {
	return (
		<Link to={to}>
			<Button style={styles}>{children}</Button>
		</Link>
	)
}

export default BigLink
