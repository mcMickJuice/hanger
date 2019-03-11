import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
	to: string
	children: React.ReactNode
}

const styles = {
	padding: '8px 0'
}

const BigLink = ({ to, children }: Props) => {
	return (
		<Link to={to}>
			<div style={styles}>{children}</div>
		</Link>
	)
}

export default BigLink
