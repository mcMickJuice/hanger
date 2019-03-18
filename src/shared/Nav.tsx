import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
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

const styles = {
	appBar: {
		top: 'auto',
		bottom: 0
		// height: '70px'
	},
	toolbar: {
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	homeButton: {
		color: 'white'
	}
}

type NavStyles = WithStyles<typeof styles>

const Nav = ({ children, classes }: NavProps & NavStyles) => {
	const [isMenuVisible, setMenuVisible] = React.useState(false)

	function toggleMenuVisible() {
		setMenuVisible(isOpen => !isOpen)
	}

	return (
		<div style={rootStyles}>
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
						</div>
					</div>
				) : null}
				{children}
			</div>
			<AppBar
				position="fixed"
				classes={{
					positionFixed: classes.appBar
				}}
			>
				<Toolbar classes={{ root: classes.toolbar }}>
					<Link to="/">
						<IconButton
							classes={{
								root: classes.homeButton
							}}
						>
							<HomeIcon />
						</IconButton>
					</Link>

					<IconButton color="inherit" onClick={toggleMenuVisible}>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default withStyles(styles)(Nav)
