import React, { ButtonHTMLAttributes } from 'react'

const Button = (props: ButtonHTMLAttributes<any>) => {
	return <button {...props}>{props.children}</button>
}

export default Button
