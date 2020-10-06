import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import NavbarInstrutor from '../../components/navbar-instrutor'

import UsuarioService from '../../app/service/usuarioService'
import LocalStorageService from '../../app/service/localStorageService'

import { mensagemSucesso, mensagemErro, mensagemAlerta } from '../../components/toastr'

class CadastroInstrutores extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        dataAdmissao: ''
    }

    constructor() {
        super()
        this.service = new UsuarioService()
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        if (usuarioLogado == null) {
            mensagemAlerta('Por favor logar para acessar o sistema.')
            this.props.history.push('/login')
        } else {
            if(usuarioLogado.tipoUsuario === 1) {
                mensagemAlerta('Você não tem permissão para acessar essa tela.')
                this.props.history.push('/home')
            }
        }        
    }

    validar() {
        const msgs = []

        if(!this.state.nome) {
            msgs.push('O campo Nome é obrigatório.')
        }

        if(!this.state.email) {
            msgs.push('O campo Email é obrigatório.')
        } else if (!this.state.email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('Informe um Email válido.')
        }

        if(!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push('Digite a senha 2x.')
        } else if (this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('As senhas não são iguais.')
        }

        if(!this.state.telefone) {
            msgs.push('O campo Telefone é obrigatório.')
        }

        if(!this.state.dataAdmissao) {
            msgs.push('O campo Data Admissão é obrigatório.')
        }

        return msgs
    }

    cadastrar = () => {
        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            });
            return false;
        }

        const instrutorDTO = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            telefone: this.state.telefone,
            dataAdmissao: this.state.dataAdmissao
        }

        this.service.salvarInstrutor(instrutorDTO)
            .then( response => {
                mensagemSucesso('Instrutor cadastrado com sucesso! Faça o login para acessar o sistema.')
                this.props.history.push('/consulta-instrutores')
            }).catch( error => {
                mensagemErro(error.response.data)
            });
    }

    cancelar = () => {
        this.props.history.push('/home')
    }

    consultarInstrutores = () => {
        this.props.history.push('/consulta-instrutores')
    }

    render() {

        return (
            <>
            <NavbarInstrutor />
            <Card title="Cadastro de Instrutores">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <button onClick={this.consultarInstrutores} type="button" className="btn btn-primary">Consultar Instrutores</button>

                            <br />
                            <br />
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                        id="inputNome"
                                        className="form-control" 
                                        name="nome"
                                        placeholder="Ex.: Coach Jonas" 
                                        onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" 
                                        id="inputEmail" 
                                        className="form-control" 
                                        name="email" 
                                        placeholder="Ex.: maria@email.com" 
                                        onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" 
                                        id="inputSenha" 
                                        className="form-control" 
                                        name="senha" 
                                        placeholder="Digite uma senha" 
                                        onChange={e => this.setState({senha: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" 
                                        id="inputRepitaSenha" 
                                        className="form-control" 
                                        name="senha" 
                                        placeholder="Repita a senha" 
                                        onChange={e => this.setState({senhaRepeticao: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Telefone: *" htmlFor="inputTelefone">
                                <input type="text" 
                                        id="inputTelefone" 
                                        className="form-control"
                                        name="telefone" 
                                        placeholder="Ex.: 9 9999-9999" 
                                        onChange={e => this.setState({telefone: e.target.value})} />
                            </FormGroup>

                            <FormGroup label="Data de Admissão: *" htmlFor="inputDataAdmissao">
                                <input type="date" 
                                        id="inputDataAdmissao" 
                                        className="form-control" 
                                        name="dataAdmissao" 
                                        onChange={e => this.setState({dataAdmissao: e.target.value})} />
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

export default withRouter( CadastroInstrutores )