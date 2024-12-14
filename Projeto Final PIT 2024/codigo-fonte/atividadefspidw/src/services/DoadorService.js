const API_BASE_URL = 'http://localhost:3006';
class DoadorService {

    async buscarPorNome(nome) {
        try {
            const response = await fetch(`${API_BASE_URL}/doadores/buscar/${nome}`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar doadores por nome:', error);
            return [];
        }
    }

    async obterTodos( ) {
        const response = await fetch(`${API_BASE_URL}/doadores`,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!response.ok) {
            console.log('Ocorreu um erro ao listar.')
        } else {
            const dados = await response.json( )
            return dados
        }
    }

    async obterPorId(id) {
        const response = await fetch(`${API_BASE_URL}/doadores/${id}`,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!response.ok) {
            console.log('Ocorreu um erro ao listar.')
        } else {
            const dados = await response.json( )
            return dados
        }
    }

    async adicionar(doadorDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/doadores`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(doadorDados)
            })
            if(!response.ok) {
                console.log('Ocorreu um erro ao adicionar.')
                throw new Error('Erro ao cadastrar o doador.')
            }
        } catch (error) {
            throw error
        }
    }

    async atualizar(idDoador, doadorDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/doadores/${idDoador}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(doadorDados)
            })
            if(!response.ok) {
                console.log('Ocorreu um erro ao atualizar.')
                throw new Error('Erro ao atualizar o doador.')
            }
        } catch (error) {
            throw error
        }
    }

    async delete(idDoador) {
        try {
            const response = await fetch(`${API_BASE_URL}/doadores/${idDoador}`,{
                method:'DELETE'
            })
            if(!response.ok) {
                console.log('Ocorreu um erro ao deletear.')
                throw new Error('Erro ao deletar o doador.')
            }
        } catch (error) {
            throw error
        }
    }

    async filtrar(termobusca) {
        const response = await fetch(`${API_BASE_URL}/doadores/filtrar/${termobusca}`,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!response.ok) {
            console.log('Ocorreu um erro ao listar.')
        } else {
            const dados = await response.json( )
            return dados
        }
    }
}

export default DoadorService