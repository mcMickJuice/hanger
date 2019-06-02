import React from 'react'
import IdentityModal from 'react-netlify-identity-widget'

function AuthModal() {
	function handleCloseDialog() {
		console.log('dialog closed')
	}

	return <IdentityModal showDialog={true} onCloseDialog={handleCloseDialog} />
}

export default AuthModal
