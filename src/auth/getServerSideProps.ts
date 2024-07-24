import nookies from "nookies";
import { tokenService } from "./tokenService";

export async function getServerSideProps(ctx: any) {
    const cookies = nookies.get(ctx);
    console.log('cookies ', cookies)

    return {
        props: {
            token: tokenService.get(ctx)
        }
    }
}