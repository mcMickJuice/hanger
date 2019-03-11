import React from 'react'

interface Props {
	onChange: (text: string) => void
	value: string
	label: string
	name: string
	autofocus?: boolean
}

const defaultStyles = {
	padding: '16px',
	width: '100%',
	fontSize: '16px'
}

const TextInput = ({ onChange, value, label, name, autofocus }: Props) => {
	const inputRef = React.useRef<HTMLInputElement>(null)

	React.useEffect(() => {
		if (autofocus && inputRef.current != null) {
			inputRef.current.focus()
		}
	}, [])

	return (
		<div>
			<input
				style={defaultStyles}
				ref={inputRef}
				value={value}
				placeholder={label}
				onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
					onChange(evt.target.value)
				}
				name={name}
			/>
		</div>
	)
}

export default TextInput
