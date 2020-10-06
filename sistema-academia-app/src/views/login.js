import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localStorageService'
import { mensagemErro, mensagemSucesso } from '../components/toastr'
import Navbar from '../components/navbar'

class Login extends React.Component {

    state = {
        email : '',
        senha : ''
    }

    constructor() {
        super();
        this.service = new UsuarioService()
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        if (usuarioLogado !== null) {
            LocalStorageService.removerItem('_usuario_logado')
        }        
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            mensagemSucesso('Usuário autenticado com sucesso')
            LocalStorageService.adicionarItem('_usuario_logado', response.data)
             this.props.history.push('/home')
         }).catch( erro => {
             mensagemErro(erro.response.data)
         })
    };

    prepareCadastrarAluno = () => {
        this.props.history.push('/cadastro-alunos')
    };

    prepareCadastrarInstrutor = () => {
        this.props.history.push('/cadastro-instrutores')
    };

    render() {
        return (
            <>
            <Navbar />
            <div className="row">
                <div className="col-md-6" style={ {position: 'relative', left: '300px'} }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email" 
                                                    value={this.state.email}
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Digite o email" />
                                            </FormGroup>

                                            <FormGroup label="Senha: *" htmlFor="exampleInputSenha1">
                                                <input type="password"
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({senha: e.target.value})} 
                                                    className="form-control" 
                                                    id="exampleInputSenha1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Digite a senha" />
                                            </FormGroup>

                                            <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                            {/* <button onClick={this.prepareCadastrarAluno} className="btn btn-primary">Cadastrar Aluno</button>
                                            <button onClick={this.prepareCadastrarInstrutor} className="btn btn-danger">Cadastrar Instrutor</button> */}
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            </>
        )
    }

}

export default withRouter( Login )