import React, { ButtonHTMLAttributes } from 'react'

const defaultStyle = {
	width: '100%',
	padding: '16px',
	backgroundColor: '#69b0dc',
	fontSize: '16px'
}

const Button = (props: ButtonHTMLAttributes<any>) => {
	const { style, ...rest } = props
	const effectiveStyle = {
		...defaultStyle,
		...style
	}

	return (
		<button style={effectiveStyle} {...rest}>
			{props.children}
		</button>
	)
}

export default Button
