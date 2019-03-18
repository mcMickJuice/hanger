import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import HomeIcon from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'

interface NavProps {
	children: React.ReactNode
}

const toolbarHeight = 60
const styles = {
	appBar: {
		top: 'auto',
		bottom: 0
	},
	toolbar: {
		alignItems: 'center',
		justifyContent: 'space-between',
		height: `${toolbarHeight}px`
	},
	homeButton: {
		color: 'white'
	},
	body: {
		padding: `8px 8px ${toolbarHeight}px 8px`
	}
}

type NavStyles = WithStyles<typeof styles>

interface MenuItemLinkProps {
	to: string
	children: string
}

const MenuItemLink = ({ to, children }: MenuItemLinkProps) => {
	return (
		<Link to={to} style={{ textDecoration: 'none', display: 'block' }}>
			<MenuItem>{children}</MenuItem>
		</Link>
	)
}

const Nav = ({ children, classes }: NavProps & NavStyles) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

	function handleMenuClose() {
		setAnchorEl(null)
	}

	function handleMenuClick(evt: React.MouseEvent<HTMLElement>) {
		const { currentTarget } = evt

		setAnchorEl(currentTarget)
	}

	return (
		<div>
			<div className={classes.body}>{children}</div>
			<AppBar
				position="fixed"
				classes={{
					positionFixed: classes.appBar
				}}
			>
				<Menu
					anchorEl={anchorEl}
					open={anchorEl != null}
					onClose={handleMenuClose}
					onClick={handleMenuClose}
				>
					<MenuItemLink to="/">Home</MenuItemLink>
					<MenuItemLink to="/build">Build a Plan</MenuItemLink>
					<MenuItemLink to="/plan">See All Plans</MenuItemLink>
				</Menu>
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

					<IconButton color="inherit" onClick={handleMenuClick}>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default withStyles(styles)(Nav)
