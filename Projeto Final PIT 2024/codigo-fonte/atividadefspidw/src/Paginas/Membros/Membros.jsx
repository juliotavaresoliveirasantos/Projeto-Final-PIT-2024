// Membros.jsx

import React, { useEffect, useState } from "react";
import { FaCog, FaEdit, FaListAlt, FaPlusCircle, FaSearchPlus, FaTrash } from "react-icons/fa";
import { Container, Card, Row, Col, Button, Form, Table, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
// Importar corretamente o MembroService
import MembroService from '../../services/MembroService';

const membroService = new MembroService(); // Certifique-se de que isso está correto

function Membros() {
    const [listaMembros, setListaMembros] = useState([]);
    const [termoBusca, setTermoBusca] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value);
    };

    const handleFiltrar = async () => {
        await listarMembros(termoBusca);
    };

    const listarMembros = async (termoBusca) => {
        setCarregando(true);
        let dados = [];
        try {
            if (termoBusca) {
                dados = await membroService.filtrar(termoBusca);
            } else {
                dados = await membroService.listar();
            }
            setListaMembros(dados);
        } catch (error) {
            console.error('Erro ao listar membros:', error);
        }
        setCarregando(false);
    };

    useEffect(() => {
        listarMembros();
    }, []);

    const handleExcluir = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir o membro?')) {
            setCarregando(true);
            await membroService.delete(id);
            await listarMembros();
            setCarregando(false);
        }
    };

    return (
        <>
            <h1><FaListAlt /> Membros</h1>

            <Container>
                <Col lg='12'>
                    <div className="d-grid">
                        <Button size="lg" as={Link} to='/membros/novo' variant="primary">
                            <FaPlusCircle /> 
                        </Button>
                    </div>
                </Col>

                <br />

            </Container>
            <Container>
                <Card>
                    <Card.Header as="h4">Membros cadastrados</Card.Header>
                    <Card.Body>
                        <Row lg='12'>
                            <div className="d-grid">
                                <Form.Control
                                    type="text"
                                    onChange={handleBuscaChange}
                                    placeholder="Nome"
                                />
                                <Button onClick={handleFiltrar} variant="primary">
                                    <FaSearchPlus /> 
                                </Button>
                            </div>
                        </Row>
                        <br />
                        {carregando ? (
                            <div className="text-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Carregando...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Nome</th>
                                        <th>Cpf</th>
                                        <th>Genêro</th>
                                        <th>Telefone</th>
                                        <th>Email</th>
                                        <th>Endereço</th>
                                        <th>Ativo</th>
                                        <th><FaCog /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listaMembros && listaMembros.length > 0 ? (
                                            listaMembros.map(membro => (
                                                <tr >
                                                    <td>{membro.id}</td>
                                                    <td>{membro.nome}</td>
                                                    <td>{membro.cpf}</td>
                                                    <td>{membro.genero}</td>
                                                    <td>{membro.telefone}</td>
                                                    <td>{membro.email}</td>
                                                    <td>{membro.endereco}</td>
                                                    <td>{membro.ativo}</td>
                                                    <td id="BotoesTabela">
                                                        <Link to={`/membros/${membro.id}`} className="btn btn-warning m-1">
                                                            <FaEdit /> Alterar
                                                        </Link>
                                                        <Button onClick={() => handleExcluir(membro.id)} className="btn btn-danger m-1">
                                                            <FaTrash /> Excluir
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="6">Nenhum membro registrado.</td></tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Membros;
