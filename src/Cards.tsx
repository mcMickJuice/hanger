import React from 'react'
import { useTransition, animated } from 'react-spring'
import ItemPositionContext from './ItemPositionContext'
import CardActions from './CardActions'

const cardHeight = 70
const gap = 20

const Card = ({ children }: { children: any }) => {
	return (
		<div
			style={{
				height: `${cardHeight}px`,
				border: '1px solid black'
			}}
		>
			{children}
		</div>
	)
}

function ReorderThing() {
	const { randomizeOrder, itemIds } = React.useContext(ItemPositionContext)

	// no idea what this typing is doing..but this gets typescrpt to shutup
	const transitions = useTransition<
		{ id: string; y: number },
		{ height: number; y: number }
	>(
		itemIds.map((id, idx) => {
			return {
				id,
				y: (cardHeight + gap) * idx,
				height: cardHeight
			}
		}),
		d => {
			return d.id
		},
		{
			from: { height: 0, y: 0 },
			leave: { height: 0, y: 0 },
			enter: ({ y, id }: { y: number; id: string }) => ({ y, id }),
			update: ({ y, id }: { y: number; id: string }) => ({ y, id })
		} as any
	)

	return (
		<div style={{ width: '300px' }}>
			<button onClick={randomizeOrder}>Randomize</button>
			<div>
				{transitions.map(({ item, key, props: { y, ...rest } }, idx) => {
					return (
						<animated.div
							key={key}
							style={{
								transform: y.interpolate(y => `translate3d(0, ${y}px,0`),
								...rest
							}}
						>
							<Card>
								<div
									style={{ display: 'flex', justifyContent: 'space-between' }}
								>
									<div>{item.id}</div>
									<CardActions itemId={item.id} />
								</div>
							</Card>
						</animated.div>
					)
				})}
			</div>
		</div>
	)
}

export default ReorderThing