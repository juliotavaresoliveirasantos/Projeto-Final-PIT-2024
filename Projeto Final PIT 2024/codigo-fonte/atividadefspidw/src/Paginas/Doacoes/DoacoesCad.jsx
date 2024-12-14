import { Container, Card, Button, Col, Form, Alert, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaFileUpload, FaRegSave } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import DoacaoService from '../../services/DoacaoService';
import DoadorService from '../../services/DoadorService';

const doacaoService = new DoacaoService();
const doadorService = new DoadorService();

function DoacaoCadastro() {
    const [sucessoMensagem, setSucessoMensagem] = useState('');
    const [validated, setValidated] = useState(false);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [nomesSugeridos, setNomesSugeridos] = useState([]);
    const [errors, setErrors] = useState({});
    const { idDoacao } = useParams();
    const [showSuggestions, setShowSuggestions] = useState(false); 
    useEffect(() => {
        if (idDoacao) {
            const fetchDoacao = async () => {
                const dados = await doacaoService.obterPorId(idDoacao);
                if (dados) {
                    setNome(dados.nome);
                    setCpf(dados.cpf);
                    setTipo(dados.tipo);
                    setDescricao(dados.descricao);
                }
            };
            fetchDoacao();
        }
    }, [idDoacao]);

    const handleNomeChange = async (e) => {
        const value = e.target.value;
        setNome(value);

        if (value) {
            try {
                const sugestoes = await doadorService.buscarPorNome(value);
                console.log('sugestoes',sugestoes)
                setNomesSugeridos(sugestoes || []);
                setShowSuggestions(true);
            } catch (error) {
                console.error('Erro ao buscar doadores:', error);
                setNomesSugeridos([]);
                setShowSuggestions(false);
            }
        } else {
            setNomesSugeridos([]);
            setCpf('');
            setShowSuggestions(false);
        }
    };

    const handleNomeSelect = (nomeSelecionado) => {
        const selecionado = nomesSugeridos.find(doador => doador.nome === nomeSelecionado);
        if (selecionado) {
            setNome(selecionado.nome);
            setCpf(selecionado.cpf); // Preenche o CPF correspondente
        }
        setNomesSugeridos([]);
    };

    const handleSalvar = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        if (!nome || !cpf || !tipo || !descricao) {
            setErrors({
                nome: !nome ? 'Nome é obrigatório.' : null,
                cpf: !cpf ? 'CPF é obrigatório.' : null,
                tipo: !tipo ? 'Tipo é obrigatório.' : null,
                descricao: !descricao ? 'Descrição é obrigatória.' : null,
            });
            return;
        }

        const doacao = { nome, cpf, tipo, descricao };

        try {
            if (!idDoacao) {
                await doacaoService.adicionar(doacao);
                setSucessoMensagem('Doação cadastrada com sucesso!');
            } else {
                await doacaoService.atualizar(idDoacao, doacao);
                setSucessoMensagem('Doação atualizada com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao salvar doação:', error);
        }
        setValidated(true);
    };

    return (
        <>
            <Button variant="secondary" as={Link} to="/doacoes">
                <FaArrowLeft /> Voltar
            </Button>
            <Container className="mt-5">
                <Card>
                    <Card.Header>
                        <h1>
                            <FaFileUpload /> Cadastro de Doação
                        </h1>
                    </Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSalvar}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="nomeDoacao">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={nome}
                                            onChange={handleNomeChange}
                                            list="nomesSugeridos"
                                            isInvalid={!!errors.nome}
                                        />
                       {showSuggestions && nomesSugeridos.length > 0 && (
                                            <ul className="sugestoes">
                                                {nomesSugeridos.map((doador, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleNomeSelect(doador.nome)}
                                                        className="suggestion-item"
                                                    >
                                                        {doador.nome}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <Form.Control.Feedback type="invalid">
                                            {errors.nome}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="cpfDoacao" className="mt-3">
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={cpf}
                                            readOnly
                                            isInvalid={!!errors.cpf}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.cpf}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="tipoDoacao" className="mt-3">
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Select
                                            value={tipo}
                                            onChange={(e) => setTipo(e.target.value)}
                                            isInvalid={!!errors.tipo}
                                        >
                                            <option value="">Selecione o tipo</option>
                                            <option value="Dinheiro">Dinheiro</option>
                                            <option value="Objeto">Objeto</option>
                                            <option value="Outros">Outros</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.tipo}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="descricaoDoacao" className="mt-3">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={descricao}
                                            onChange={(e) => setDescricao(e.target.value)}
                                            isInvalid={!!errors.descricao}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.descricao}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className='d-grid'>
                            <Button id="BotaoSalvarDespesa"type="submit" widht="100%"  size='lg' variant="success" className="mt-4">
                                <FaRegSave /> 
                            </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
                {sucessoMensagem && (
                    <Alert variant="success" className="mt-3">
                        <FaCheckCircle /> {sucessoMensagem}
                    </Alert>
                )}
            </Container>
        </>
    );
}

export default DoacaoCadastro;
