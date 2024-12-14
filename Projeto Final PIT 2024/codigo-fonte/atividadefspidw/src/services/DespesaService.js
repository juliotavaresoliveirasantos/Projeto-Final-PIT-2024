const API_BASE_URL = 'http://localhost:3006'
class DespesaService {
    async obterTodos( ) {
        const response = await fetch(`${API_BASE_URL}/despesa`,{
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
        const response = await fetch(`${API_BASE_URL}/despesa/${id}`,{
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

    async adicionar(despesaDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/despesa`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(despesaDados)
            })
            if(!response.ok) {
                console.log('Ocorreu um erro ao adicionar.')
                throw new Error('Erro ao cadastrar a despesa.')
            }
        } catch (error) {
            throw error
        }
    }

    async atualizar(idDespesa, despesaDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/despesa/${idDespesa}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(despesaDados)
            })
            if(!response.ok) {
                console.log('Ocorreu um erro ao atualizar.')
                throw new Error('Erro ao atualizar a despesa.')
            }
        } catch (error) {
            throw error
        }
    }

    async delete(idDespesa) {
        try {
            const response = await fetch(`${API_BASE_URL}/despesa/${idDespesa}`,{
                method:'DELETE'
            })
            if(!response.ok) {
                console.log('Ocorreu um erro ao deletar.')
                throw new Error('Erro ao deletar a despesa.')
            }
        } catch (error) {
            throw error
        }
    }

    async filtrar(termobusca) {
        const response = await fetch(`${API_BASE_URL}/despesa/filtrar/${termobusca}`,{
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

export default DespesaService