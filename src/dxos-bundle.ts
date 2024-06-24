import { Client } from '@dxos/client'
import { InvitationEncoder } from '@dxos/client/invitations'
import { Expando } from '@dxos/client/echo'
//import { runShell } from '@dxos/shell'

	const dxos = {
	  Client, InvitationEncoder, Expando, // runShell
	}

// @ts-ignore allow "window.dxos"
	window.dxos = dxos

	document.dispatchEvent(
	  new CustomEvent('dxos',{ detail:dxos })
	)
