import React from 'react'
import BigLink from './BigLink'
import ZIndex from '../z_index'

interface NavProps {
	children: React.ReactNode
}

const rootStyles = {
	height: '100%'
}

const navBarStyles = {
	height: '80px',
	backgroundColor: 'aqua',
	display: 'flex',
	justifyContent: 'space-between'
}

const navMenuStyles = {
	position: 'absolute' as 'absolute',
	backgroundColor: 'white',
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	zIndex: ZIndex.Top
}

const navMenuInnerStyles = {
	width: '90%',
	margin: 'auto'
}

const bodyStyles = {
	position: 'relative' as 'relative',
	height: '100%',
	padding: '8px'
}

interface NavLinkProps {
	children: React.ReactNode
	onNavigate: () => void
}

const navLinkStyles = {
	marginTop: '16px'
}
const NavLink = ({ children, onNavigate }: NavLinkProps) => {
	return (
		<div onClick={onNavigate} style={navLinkStyles}>
			{children}
		</div>
	)
}

const Nav = ({ children }: NavProps) => {
	const [isMenuVisible, setMenuVisible] = React.useState(false)

	function toggleMenuVisible() {
		setMenuVisible(isOpen => !isOpen)
	}

	return (
		<div style={rootStyles}>
			<div style={navBarStyles}>
				<div>Icon</div>
				<div onClick={toggleMenuVisible}>Click to show menu</div>
			</div>
			<div style={bodyStyles}>
				{isMenuVisible ? (
					<div style={navMenuStyles}>
						<div style={navMenuInnerStyles}>
							<NavLink onNavigate={() => setMenuVisible(false)}>
								<BigLink to="/">Home</BigLink>
							</NavLink>
							<NavLink onNavigate={() => setMenuVisible(false)}>
								<BigLink to="/build">Build a Plan</BigLink>
							</NavLink>
							<NavLink onNavigate={() => setMenuVisible(false)}>
								<BigLink to="/plan">See All Plans</BigLink>
							</NavLink>
							<NavLink onNavigate={() => setMenuVisible(false)}>
								<BigLink to="/repositioning">Reorder feature (WIP)</BigLink>
							</NavLink>
						</div>
					</div>
				) : null}
				{children}
			</div>
		</div>
	)
}

export default Nav
