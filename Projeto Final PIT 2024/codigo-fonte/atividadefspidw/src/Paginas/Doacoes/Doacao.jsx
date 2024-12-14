import {FaCog, FaEdit, FaListAlt, FaPlusCircle, FaSearchPlus, FaTrash, FaFileExcel, FaFilePdf} from "react-icons/fa"
import {useEffect, useState} from "react"
import {Container, Card, Row, Col, Button, Form, Table} from "react-bootstrap"
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import {Link} from 'react-router-dom'
import DoacaoService from '../../services/DoacaoService'
 import './Doacao.css'
const doacaoService = new DoacaoService ( )

function Doacao ( ) {
    const [listaDoacoes, setListaDoacoes] = useState([ ])
    const [termoBusca, setTermoBusca] = useState("")
    const [dados, setDados] = useState([]);
    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value)
    }

    const handleFiltrar = async ( )=> {
        await listarDoacoes(termoBusca)
    }

    const listarDoacoes = async (termoBusca) => {
        let dados = []
        if(termoBusca) {
            dados = await doacaoService.filtrar(termoBusca)
            setListaDoacoes(dados)
        } else {
            dados = await doacaoService.obterTodos( )
            setListaDoacoes(dados)
        }

    }

    useEffect(( )=>{
        listarDoacoes ( )
    }, [ ])
/*         const listaSalva = localStorage.getItem('evento')
            if(listaSalva!=null) {
                setListaEventos(JSON.parse(listaSalva))
            } */


    const handleExcluir = async (id) => {
        if(window.confirm('Tem certeza que deseja excluir a doação?')) {
            await doacaoService.delete(id)
            await listarDoacoes( )
        }
    }
    useEffect(() => {
        fetch('http://localhost:3006/doacoes')
            .then(response => response.json())
            .then(data => setDados(data))
            .catch(error => console.error('Erro ao carregar dados:', error));
    }, []);

    // Função para exportar em Excel
    const exportarExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dados);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Doações');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'doacoes.xlsx');
    };

    // Função para exportar em PDF
    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.text('Lista de Doações', 10, 10);
        const tabela = dados.map((doacao, index) => [
            index + 1,
            doacao.nome, 
            doacao.cpf,
            doacao.tipo,
            doacao.descricao
        ]);
        doc.autoTable({
            head: [['#', 'Nome', 'CPF', 'Tipo', 'Descrição']],
            body: tabela,
        });
        doc.save('doacoes.pdf');
    };

/*         const novosEventos = listaEventos.filter(evento => evento.id!==id)
        setListaEventos(novosEventos)
        localStorage.setItem('evento',JSON.stringify(novosEventos)) */


    return (<>
        <h1><FaListAlt></FaListAlt> Doações</h1>

        <Container>

        <Col lg='12'>
                <div className="d-grid">
                <Button size="lg" as={Link} to='/doacoes/novo' variant="primary"><FaPlusCircle></FaPlusCircle></Button>
                </div>
              
        </Col>

        <br></br>
        </Container>
        <Container>
        <Card>
            <Card.Header as="h4">Doações cadastradas</Card.Header>
            <Card.Body>
            <Row lg='12'>
                <div className="d-grid">
                <Form.Control type="text" onChange={handleBuscaChange} placeholder="Nome"></Form.Control>
                <Button onClick={handleFiltrar} variant="primary"><FaSearchPlus> Pesquisar</FaSearchPlus></Button>
                </div>
            </Row>
            <br></br>
            <Row>
                            <Col>
                                <Button onClick={exportarExcel} variant="success" className="m-1">
                                    <FaFileExcel /> Exportar Excel
                                </Button>
                                <Button onClick={exportarPDF} variant="danger" className="m-1">
                                    <FaFilePdf /> Exportar PDF
                                </Button>
                            </Col>
                        </Row>
                        <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Tipo</th>
                   
                    <th>Descrição</th>
                    
                    <th><FaCog></FaCog></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaDoacoes.length<=0? "Nenhuma doação registrada.":
                        listaDoacoes.map(doacao=>(
                        <tr>
                            <td>{doacao.id}</td>
                            <td>{doacao.nome}</td> 
                            <td>{doacao.cpf}</td>
                            <td>{doacao.tipo}</td>
                       
                            <td>{doacao.descricao}</td>
                        
                            <td id="BotoesTabela">
                                <Link to = {`/doacoes/${doacao.id}`} className="btn btn-warning m-1"><FaEdit></FaEdit> Alterar</Link>
                                <Button onClick={( )=> handleExcluir(doacao.id)} className="btn btn-danger m-1"><FaTrash></FaTrash> Excluir</Button>
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

export default Doacao