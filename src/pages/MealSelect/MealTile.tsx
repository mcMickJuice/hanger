import React from 'react'

const MealTile = ({
	style,
	children,
	onClick
}: {
	style: React.CSSProperties
	children: React.ReactNode
	onClick: () => void
}) => {
	return (
		<div
			style={{
				width: '25%',
				margin: '8px',
				padding: '8px',
				...style
			}}
			onClick={onClick}
		>
			{children}
		</div>
	)
}

export default MealTile
