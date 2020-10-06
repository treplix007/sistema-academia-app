import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import AvaliacaoService from '../../app/service/avaliacaoService'
import NavbarInstrutor from '../../components/navbar-instrutor'
import AlunoService from '../../app/service/alunoService'
import InstrutorService from '../../app/service/instrutorService'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'

class CadastroAvaliacoes extends React.Component {

    state = {
        alunos : [],
        aluno: '',
        instrutores : [],
        instrutor: '',
        avaliador: '',
        altura: '',
        gorduraCorporal: '',
        panturrilha: '',
        abdomen: '',
        torax: '',
        quadril: '',
        pressao: '',
        peso: '',
        frequenciaCardiaca: '',
        dataAvaliacao: '',
        dataDesempenho: ''
    }

    constructor() {
        super()
        this.avaliacaoService = new AvaliacaoService()
        this.alunoService = new AlunoService()
        this.instrutorService = new InstrutorService()
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        if (usuarioLogado == null) {
            messages.mensagemAlerta('Por favor logar para acessar o sistema.')
            this.props.history.push('/login')
        } else if(usuarioLogado.tipoUsuario === 1) {
            messages.mensagemAlerta('Você não tem permissão para acessar essa tela.')
            this.props.history.push('/home')
        } else {
            this.buscarTodosAlunos()
            this.buscarTodosInstrutores()
        }       
    }

    buscarTodosAlunos = () => {
        this.alunoService
            .buscarTodos()
            .then( resposta => {
                this.setState({ alunos: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    buscarTodosInstrutores = () => {
        this.instrutorService
            .buscarTodos()
            .then( resposta => {
                this.setState({ instrutores: resposta.data })
            }).catch( error => {
                console.log(error)
            })
    }

    validar() {
        const msgs = []

        if(!this.state.aluno) {
            msgs.push('O campo Aluno é obrigatório.')
        }

        if(!this.state.altura) {
            msgs.push('O campo Altura é obrigatório.')
        }

        if(!this.state.gorduraCorporal) {
            msgs.push('O campo Gordura Corporal é obrigatório.')
        }

        if(!this.state.panturrilha) {
            msgs.push('O campo Panturrilha é obrigatório.')
        }

        if(!this.state.abdomen) {
            msgs.push('O campo Abdomen é obrigatório.')
        }

        if(!this.state.torax) {
            msgs.push('O campo Torax é obrigatório.')
        }

        if(!this.state.quadril) {
            msgs.push('O campo Quadril é obrigatório.')
        }

        if(!this.state.pressao) {
            msgs.push('O campo Pressão é obrigatório.')
        }

        if(!this.state.peso) {
            msgs.push('O campo Peso é obrigatório.')
        }

        if(!this.state.frequenciaCardiaca) {
            msgs.push('O campo Frequência Cardíaca é obrigatório.')
        }

        if(!this.state.dataAvaliacao) {
            msgs.push('O campo Data Avaliação é obrigatório.')
        }

        return msgs
    }

    consultarAvaliacoes = () => {
        this.props.history.push('/consulta-avaliacoes')
    }

    cadastrar = () => {
        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                messages.mensagemErro(msg)
            });
            return false;
        }

        const avaliacaoDTO = {
            aluno: this.state.aluno,
            avaliador: this.state.avaliador,
            altura: this.state.altura,
            gorduraCorporal: this.state.gorduraCorporal,
            panturrilha: this.state.panturrilha,
            abdomen: this.state.abdomen,
            torax: this.state.torax,
            quadril: this.state.quadril,
            pressao: this.state.pressao,
            peso: this.state.peso,
            frequenciaCardiaca: this.state.frequenciaCardiaca,
            dataAvaliacao: this.state.dataAvaliacao,
            dataDesempenho: this.state.dataAvaliacao
        }

        this.avaliacaoService.salvar(avaliacaoDTO)
            .then( response => {
                messages.mensagemSucesso('Avaliação Física cadastrada com sucesso!')
                this.props.history.push('/consulta-avaliacoes')
            }).catch( error => {
                messages.mensagemErro(error.response.data)
            });
    }

    cancelar = () => {
        this.props.history.push('/home')
    }

    render() {

        const alunos = [
            { label: 'Selecione...', value: '' }
        ]

        this.state.alunos.map( aluno => {
            return (
                alunos.push({ label: aluno.nome + ' - ' + aluno.cpf, value: aluno.id })
            )
        });

        const instrutores = [
            { label: 'Selecione...', value: '' }
        ]

        this.state.instrutores.map( instrutor => {
            return (
                instrutores.push({ label: instrutor.nome, value: instrutor.nome })
            )
        });

        return (
            <>
            <NavbarInstrutor />
            <Card title="Cadastro de Avaliação Física">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <button onClick={this.consultarAvaliacoes} type="button" className="btn btn-primary">Consultar Avaliações</button>

                            <br />
                            <br />
                            <FormGroup htmlFor="inputAlunos" label="Alunos: *">
                                <SelectMenu id="inputAlunos" className="form-control" lista={alunos} onChange={e => this.setState({aluno: e.target.value})} />
                            </FormGroup>

                            <FormGroup htmlFor="inputIntrutores" label="Avaliador/Instrutor: *">
                                <SelectMenu id="inputIntrutores" className="form-control" lista={instrutores} onChange={e => this.setState({avaliador: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Data da Avaliação: *" htmlFor="inputDataAvaliacao">
                                <input type="date" 
                                        id="inputDataAvaliacao" 
                                        className="form-control" 
                                        name="dataAvaliacao" 
                                        onChange={e => this.setState({dataAvaliacao: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Altura: *" htmlFor="inputAltura">
                                <input type="number" 
                                        id="inputAltura"
                                        className="form-control" 
                                        name="altura"
                                        placeholder="Ex.: 1.75" 
                                        onChange={e => this.setState({altura: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Gordura Corporal: *" htmlFor="inputGorduraCorporal">
                                <input type="number" 
                                        id="inputGorduraCorporal"
                                        className="form-control" 
                                        name="gorduraCorporal"
                                        onChange={e => this.setState({gorduraCorporal: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Panturrilha: *" htmlFor="inputPanturrilha">
                                <input type="number" 
                                        id="inputPanturrilha"
                                        className="form-control" 
                                        name="panturrilha"
                                        onChange={e => this.setState({panturrilha: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Abdomen: *" htmlFor="inputAbdomen">
                                <input type="number" 
                                        id="inputAbdomen"
                                        className="form-control" 
                                        name="abdomen"
                                        onChange={e => this.setState({abdomen: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Torax: *" htmlFor="inputTorax">
                                <input type="number" 
                                        id="inputTorax"
                                        className="form-control" 
                                        name="torax" 
                                        onChange={e => this.setState({torax: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Quadril: *" htmlFor="inputQuadril">
                                <input type="number" 
                                        id="inputQuadril"
                                        className="form-control" 
                                        name="quadril"
                                        onChange={e => this.setState({quadril: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Pressão: *" htmlFor="inputPressao">
                                <input type="number" 
                                        id="inputPressao"
                                        className="form-control" 
                                        name="pressao"
                                        onChange={e => this.setState({pressao: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Peso: *" htmlFor="inputPeso">
                                <input type="number" 
                                        id="inputPeso"
                                        className="form-control" 
                                        name="peso"
                                        onChange={e => this.setState({peso: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Frequência Cardíaca: *" htmlFor="inputFrequenciaCardiaca">
                                <input type="text" 
                                        id="inputFrequenciaCardiaca"
                                        className="form-control" 
                                        name="frequenciaCardiaca"
                                        onChange={e => this.setState({frequenciaCardiaca: e.target.value})} />
                            </FormGroup>

                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Cacelar</button>
                        </div>
                    </div>
                </div>
            </Card>
            </>
        );
    }
}

export default withRouter( CadastroAvaliacoes )