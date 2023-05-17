import { signIn } from 'next-auth/react';
import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages: {
        // signIn: '/auth/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        signIn: "/"
    },
})

export const config = {
    matcher: [
        "/users/:path*",

    ]
}