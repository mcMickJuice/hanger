import React from 'react'

// TODO: this could be an actual grid instead of flexbox
const MealTileGrid = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexWrap: 'wrap'
			}}
		>
			{children}
		</div>
	)
}

export default MealTileGrid
