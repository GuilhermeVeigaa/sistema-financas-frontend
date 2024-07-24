import nookies from "nookies"

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';

export const tokenService = {
    save(accessToken: string, ctx = null) {
        globalThis.sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
            maxAge: 86400,
            path: '/'
        })
    },
    get(ctx = null) {
        //return globalThis?.sessionStorage.getItem(ACCESS_TOKEN_KEY);
        const cookies = nookies.get(ctx);
        return cookies[ACCESS_TOKEN_KEY]
    },
    delete(ctx = null) {
        globalThis?.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        nookies.destroy(ctx, ACCESS_TOKEN_KEY)
    }
}