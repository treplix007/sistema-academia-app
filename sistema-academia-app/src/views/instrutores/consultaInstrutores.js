import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import InstrutoresTable from './instrutoresTable'
import NavbarInstrutor from '../../components/navbar-instrutor'

import InstrutorService from '../../app/service/instrutorService'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class ConsultaInstrutores extends React.Component {

    state = {
        instrutores : [],
        showConfirmDialog: false,
        instrutorDeletar: {}
    }

    constructor() {
        super();
        this.service = new InstrutorService()
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
            this.buscarTodos()
        }        
    }

    cadastrarNovo = () => {
        this.props.history.push('/cadastro-instrutores')
    }

    buscarTodos = () => {
        this.service
            .buscarTodos()
            .then( resposta => {
                this.setState({ instrutores: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        console.log(id)
    }

    abrirConfirmacao = (instrutor) => {
        this.setState({ showConfirmDialog: true, instrutorDeletar: instrutor })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, instrutorDeletar: {} })
    }

    deletar = () => {
        this.service
            .deletar(this.state.instrutorDeletar.id)
            .then( response => {
                const instrutores = this.state.instrutores
                const index = instrutores.indexOf(this.state.instrutorDeletar)
                instrutores.splice(index, 1)
                this.setState({ instrutores: instrutores, showConfirmDialog: false })
                messages.mensagemSucesso('Instrutor deletado com sucesso.')
            }).catch( error => {
                messages.mensagemErro('Erro ao tentar deletar o Instrutor.')
            })
    }

    render() {

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        return (
            <>
            <NavbarInstrutor />
            <Card title="Consulta Instrutores">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <button onClick={this.cadastrarNovo} type="button" className="btn btn-primary">Cadastrar Novo</button>

                            <br />
                            <br />
                            <InstrutoresTable instrutores={this.state.instrutores} 
                                          deletar={this.abrirConfirmacao}
                                          editar={this.editar} />
                        </div>
                    </div>
                </div>

                <div>
                    <Dialog header="Confirmação"
                            visible={this.state.showConfirmDialog}
                            style={{width: '50vw'}}
                            footer={confirmDialogFooter}
                            modal={true}
                            onHide={() => this.setState({visible: false})}>
                        Confirma a exclusão do Instrutor?
                    </Dialog>
                </div>
            </Card>
            </>
        )
    }
}

export default withRouter( ConsultaInstrutores )