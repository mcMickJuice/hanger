import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/Add'
import ViewListIcon from '@material-ui/icons/ViewList'
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

const Nav = ({ children, classes }: NavProps & NavStyles) => {
	return (
		<div>
			<div className={classes.body}>{children}</div>
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
					<Link to="/build">
						<IconButton
							classes={{
								root: classes.homeButton
							}}
						>
							<AddIcon />
						</IconButton>
					</Link>
					<Link to="/plan">
						<IconButton
							classes={{
								root: classes.homeButton
							}}
						>
							<ViewListIcon />
						</IconButton>
					</Link>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default withStyles(styles)(Nav)
