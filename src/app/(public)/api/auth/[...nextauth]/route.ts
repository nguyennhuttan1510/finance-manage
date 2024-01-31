import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: '98529189089-dr4pbbubbl4pdonrrqrkih57p0b91eqg.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    // ...add more providers here
  ],
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }