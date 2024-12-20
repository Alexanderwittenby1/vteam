import { NextRequest } from 'next/server';

export function authenticate(request: NextRequest) {
    // Hämta JWT-token från cookies (inte från Authorization-headern)
    const token = request.cookies.get('token');  // Hämta token från cookie

    console.log('Token:', token);

    if (token) {
        try {
            // Här ska du verifiera tokenen (t.ex. med JWT.verify)
            // För demonstration använder vi en hårdkodad användare som 'user'
            return { user: 'user' };  // Du bör ersätta detta med verklig användardata efter tokenvalidering
        } catch (error) {
            console.error('Token validation failed:', error);
            return null;
        }
    }

    return null;  // Ingen token i cookies, returnera null
}
