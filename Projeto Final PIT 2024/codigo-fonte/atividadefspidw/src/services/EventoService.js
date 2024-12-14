const API_BASE_URL = 'http://localhost:3006'
class EventoService {
    async obterTodos( ) {
        const response = await fetch(`${API_BASE_URL}/evento`,{
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
        const response = await fetch(`${API_BASE_URL}/evento/${id}`,{
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

    async adicionar(eventoDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/evento`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(eventoDados)
            })
            if(!response.ok) {
                console.log('Ocorreu um erro ao adicionar.')
                throw new Error('Erro ao cadastrar o evento.')
            }
        } catch (error) {
            throw error
        }
    }

    async atualizar(idEvento, eventoDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/evento/${idEvento}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(eventoDados)
            })
            if(!response.ok) {
                console.log('Ocorreu um erro ao atualizar.')
                throw new Error('Erro ao atualizar o evento.')
            }
        } catch (error) {
            throw error
        }
    }

    async delete(idEvento) {
        try {
            const response = await fetch(`${API_BASE_URL}/evento/${idEvento}`,{
                method:'DELETE'
            })
            if(!response.ok) {
                console.log('Ocorreu um erro ao deletear.')
                throw new Error('Erro ao deletar o evento.')
            }
        } catch (error) {
            throw error
        }
    }

    async filtrar(termobusca) {
        const response = await fetch(`${API_BASE_URL}/evento/filtrar/${termobusca}`,{
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

export default EventoService