import { getUser } from "./getUser";
import { tokenService } from "./tokenService";

export const authService = {
    async login({ email , password }: any) {
        return fetch('http://localhost:8800/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        }).then(async (respostaDoServidor) => {
            if(!respostaDoServidor.ok) {
                throw new Error('Credenciais inválidas')
            };
            
            const body = await respostaDoServidor.json();

            console.log(body)

            tokenService.save(body.token)
            getUser.save(body.user.name)
        })
    },

    async register({ email, name, password }: any) {
        return fetch('http://localhost:8800/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                name,
                password,
            })
        }).then(async (respostaDoServidor) => {
            if (!respostaDoServidor.ok) {
                throw new Error('Erro ao cadastrar usuário')
            }

            const body = await respostaDoServidor.json()
        })
    }
};
