
const API_BASE_URL = 'http://localhost:3006';

class DoacaoService {
    
    
        async obterTodos( ) {
            const response = await fetch(`${API_BASE_URL}/doacoes`,{
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
            const response = await fetch(`${API_BASE_URL}/doacoes/${id}`,{
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

    async adicionar(doacaoDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/doacoes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doacaoDados),
            });
            if (!response.ok) {
                throw new Error("Erro ao cadastrar a doação.");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async atualizar(idDoacao, doacaoDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/doacoes/${idDoacao}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(doacaoDados),
            });
            if (!response.ok) {
                throw new Error("Erro ao atualizar a doação.");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async excluir(idDoacao) {
        try {
            const response = await fetch(`${API_BASE_URL}/doacoes/${idDoacao}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Erro ao excluir a doação.");
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async filtrar(termobusca) {
        try {
            const response = await fetch(`${API_BASE_URL}/doacoes/filtrar/${termobusca}`, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error("Erro ao filtrar doações.");
            }
            return await response.json();
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }
}

export default DoacaoService;
