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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token and refresh_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.idToken = account.id_token
        token.expiresAt = account.expires_at
        return token
      }

      // Check if access token is still valid (accounting for a 60-second buffer)
      if (Date.now() < (token.expiresAt as number) * 1000 - 60 * 1000) {
        return token
      }

      // Access token has expired, try to update it
      try {
        const response = await fetch(`${process.env.AUTH_OPENIDDICT_ISSUER || "https://localhost:7036"}/connect/token`, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.AUTH_OPENIDDICT_ID!,
            client_secret: process.env.AUTH_OPENIDDICT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken as string,
          }),
          method: "POST",
        })

        const tokens = await response.json()

        if (!response.ok) throw tokens

        return {
          ...token,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token ?? token.refreshToken,
          expiresAt: Math.floor(Date.now() / 1000 + tokens.expires_in),
        }
      } catch (error) {
        console.error("Error refreshing access token", error)
        return { ...token, error: "RefreshAccessTokenError" as const }
      }
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
  pages: {
    signIn: '/login',
  },
})
