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

            tokenService.save(body.token)
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
