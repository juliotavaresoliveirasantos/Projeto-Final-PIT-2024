import './Despesas.css'
import {FaCog, FaEdit, FaListAlt, FaPlusCircle, FaSearchPlus, FaTrash} from "react-icons/fa"
import {useEffect, useState} from "react"
import {Container, Card, Row, Col, Button, Form, Table} from "react-bootstrap"
import {Link} from 'react-router-dom'
import DespesaService from '../../services/DespesaService'

const despesaService = new DespesaService ( )
function Despesas ( ) {
    const [listaDespesas, setListaDespesas] = useState([ ])
    const [termoBusca, setTermoBusca] = useState("")
    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value)
    }

    const handleFiltrar = async ( )=> {
        await listarDespesas(termoBusca)
    }

    const listarDespesas = async (termoBusca) => {
        let dados = []
        if(termoBusca) {
            dados = await despesaService.filtrar(termoBusca)
            setListaDespesas(dados)
        } else {
            dados = await despesaService.obterTodos( )
            setListaDespesas(dados)
        }

    }

    useEffect(( )=>{
        listarDespesas ( )
    }, [ ])
/*         const listaSalva = localStorage.getItem('evento')
            if(listaSalva!=null) {
                setListaEventos(JSON.parse(listaSalva))
            } */


    const handleExcluir = async (id) => {
        if(window.confirm('Tem certeza que deseja excluir a despesa?')) {
            await despesaService.delete(id)
            await listarDespesas( )
        }
    }
/*         const novosEventos = listaEventos.filter(evento => evento.id!==id)
        setListaEventos(novosEventos)
        localStorage.setItem('evento',JSON.stringify(novosEventos)) */


    return (<>
        <h1><FaListAlt></FaListAlt> Despesas</h1>

        <Container>

        <Col lg='12'>
                <div className="d-grid">
                <Button size="lg" as={Link} to='/despesa/novo' variant="primary"><FaPlusCircle></FaPlusCircle></Button>
                </div>
        </Col>

        <br></br>
        </Container>
        <Container>
        <Card>
            <Card.Header as="h4">Despesas cadastradas</Card.Header>
            <Card.Body>
            <Row lg='12'>
                <div className="d-grid">
                <Form.Control type="text" onChange={handleBuscaChange} placeholder="Nome"></Form.Control>
                <Button onClick={handleFiltrar} variant="primary"><FaSearchPlus> Pesquisar</FaSearchPlus></Button>
                </div>
            </Row>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Pagamento</th>
                    <th>Valor (R$)</th>
                    <th>Data de Cadastro</th>
                    <th>Horário de Cadastro</th>
                    <th><FaCog></FaCog></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaDespesas.length<=0? "Nenhuma despesa registrado.":
                        listaDespesas.map(despesa=>(
                        <tr>
                            <td>{despesa.id}</td>
                            <td>{despesa.nome}</td> 
                            <td>{despesa.tipo}</td>
                            <td>{despesa.duracao}</td>
                            <td>{despesa.valor}</td>
                            <td>{despesa.data}</td>
                            <td>{despesa.horario}</td>
                            <td id="BotoesTabela">
                                <Link to = {`/despesas/${despesa.id}`} className="btn btn-warning m-1"><FaEdit></FaEdit> Alterar</Link>
                                <Button onClick={( )=> handleExcluir(despesa.id)} className="btn btn-danger m-1"><FaTrash></FaTrash> Excluir</Button>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </Table>
            </Card.Body>
        </Card>
        </Container>
    </>)
}

export default Despesas