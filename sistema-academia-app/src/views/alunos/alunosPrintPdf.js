import React from 'react';
import ReactToPrint from 'react-to-print';

import AlunoService from '../../app/service/alunoService'
import LocalStorageService from '../../app/service/localStorageService'

import * as messages from '../../components/toastr'
 
class ComponentToPrint extends React.Component {

    state = {
        alunos : []
    }

    constructor() {
        super();
        this.service = new AlunoService()
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        if (usuarioLogado == null) {
            messages.mensagemAlerta('Por favor logar para acessar o sistema.')
            this.props.history.push('/login')
        } else {
            this.buscarTodos()
        }        
    }

    buscarTodos = () => {
        this.service
            .buscarTodos()
            .then( resposta => {
                this.setState({ alunos: resposta.data})
            }).catch( error => {
                console.log(error)
            })
    }

    render() {

        const rows = this.state.alunos.map( aluno => {
            return (
                <tr key={aluno.id}>
                    <td>{aluno.nome}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.cpf}</td>
                    <td>{aluno.rg}</td>
                </tr>
            )
        })
    
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">CPF</th>
                        <th scope="col">RG</th>
                    </tr>
                </thead>
    
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}
 
class AlunosPrintPdf extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            /* return <a href="#">Imprimir PDF da Tabela!</a> */
            return <button type="button" className="btn btn-danger">Imprimir PDF</button>
          }}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default AlunosPrintPdf