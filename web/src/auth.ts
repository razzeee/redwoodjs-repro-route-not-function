import { GitlabAuth } from 'api/src/lib/gitlabAuth'

import { createAuthentication } from '@redwoodjs/auth'

const clientId = process.env.GITLAB_CLIENT_ID
const redirectUri = process.env.GITLAB_REDIRECT_URI
const authority = process.env.GITLAB_AUTHORITY

const client = new GitlabAuth(clientId, redirectUri, authority)

function createAuth() {
  const authImplementation = createAuthImplementation(client)

  return createAuthentication(authImplementation)
}

function createAuthImplementation(client: GitlabAuth) {
  return {
    type: 'custom-auth',
    client,
    login: async () => {
      await client.makeAuthorizationRequest()
    },
    restoreAuthState: async () => {
      if (
        window?.location?.search?.includes('code=') &&
        window?.location?.search?.includes('state=')
      ) {
        await client.completeAuthorizationRequestIfPossible()
      }
    },
    logout: async () => await client.signOut(),
    getToken: async () => await client.getToken(),
    getUserMetadata: async () => await client.getUserMetadata(),
    signup: async () => {
      throw new Error('Not implemented')
    },
  }
}

export const { AuthProvider, useAuth } = createAuth()
