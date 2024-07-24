import nookies from "nookies"

const USER_NAME = 'USER_NAME';

export const getUser = {
    save(userName: string, ctx = null) {
        globalThis.sessionStorage.setItem(USER_NAME, userName);
        nookies.set(ctx, USER_NAME, userName, {
            maxAge: 86400,
            path: '/'
        })
    },
    get(ctx = null) {
        //return globalThis?.sessionStorage.getItem(USER_NAME);
        const cookies = nookies.get(ctx);
        return cookies[USER_NAME]
    },
    delete(ctx = null) {
        globalThis?.sessionStorage.removeItem(USER_NAME);
        nookies.destroy(ctx, USER_NAME)
    }
}