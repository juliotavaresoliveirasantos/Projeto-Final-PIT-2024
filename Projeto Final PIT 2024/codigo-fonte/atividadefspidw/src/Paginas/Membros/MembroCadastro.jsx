import React, { useState } from 'react';
import { Container, Card, Button, Col, Form, Alert, Row } from 'react-bootstrap';
import { FaArrowLeft, FaRegSave } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import MembroService from '../../services/MembroService';

const membroService = new MembroService();

function MembroCadastro() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [genero, setGenero] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [ativo, setAtivo] = useState(false);
  const [sucessoMensagem, setSucessoMensagem] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSalvar = async (event) => {
    event.preventDefault();
    const membro = { nome, cpf, genero, telefone, email, endereco, ativo };

    try {
      // Chama o serviço para salvar o membro
      await membroService.adicionar(membro);
      setSucessoMensagem('Membro cadastrado com sucesso!');
      
      // Redireciona para a página de listagem de membros após 2 segundos
      setTimeout(() => {
        navigate('/membros');
      }, 2000);
    } catch (error) {
      setErrors({ form: 'Erro ao salvar os dados. Verifique os campos ou tente novamente mais tarde.' });
    }
  };

  return (
    <>
      <Button variant="secondary" as={Link} to="/membros"><FaArrowLeft /> Voltar</Button>
      <Container className="mt-5">
        <Card>
          <Card.Header>
            <h1>Cadastro de Membro</h1>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSalvar}>
              <Row>
                <Col>
                  <Form.Group controlId="nomeMembro">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="cpfMembro">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="generoMembro">
                    <Form.Label>Gênero</Form.Label>
                    <Form.Select
                      value={genero}
                      onChange={(e) => setGenero(e.target.value)}
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="telefoneMembro">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="emailMembro">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="enderecoMembro">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="ativoMembro">
                    <Form.Check
                      type="checkbox"
                      label="Ativo"
                      checked={ativo}
                      onChange={(e) => setAtivo(e.target.checked)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" variant="success">
                <FaRegSave /> Salvar
              </Button>
            </Form>
          </Card.Body>
        </Card>
        {sucessoMensagem && <Alert variant="success">{sucessoMensagem}</Alert>}
        {errors.form && <Alert variant="danger">{errors.form}</Alert>}
      </Container>
    </>
  );
}

export default MembroCadastro;