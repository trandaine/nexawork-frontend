import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "openiddict",
      name: "OpenIddict",
      type: "oidc",
      issuer: process.env.AUTH_OPENIDDICT_ISSUER || "https://localhost:7036",
      clientId: process.env.AUTH_OPENIDDICT_ID,
      clientSecret: process.env.AUTH_OPENIDDICT_SECRET,
      // client: {
      //   token_endpoint_auth_method: "client_secret_post",
      // },
      authorization: {
        params: {
          scope: "openid profile api offline_access",
        },
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token and refresh_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.idToken = account.id_token
        token.expiresAt = account.expires_at
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // @ts-expect-error - Adding custom properties to session
      session.accessToken = token.accessToken
      // @ts-expect-error
      session.idToken = token.idToken
      // @ts-expect-error - Adding custom properties to session
      session.error = token.error
      return session
    },
  },
  // We can use a custom login page if we had one, but we'll use the default or auto-redirect
  // pages: {
  //   signIn: '/login',
  // },
})
