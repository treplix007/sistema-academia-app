import React from 'react'

export default props => {

    const rows = props.instrutores.map( instrutor => {
        return (
            <tr key={instrutor.id}>
                <td>{instrutor.nome}</td>
                <td>{instrutor.telefone}</td>
                <td>{instrutor.dataAdmissao[2]}/{instrutor.dataAdmissao[1]}/{instrutor.dataAdmissao[0]}</td>
                <td>
                    {/* <button type="button" 
                            className="btn btn-primary"
                            onClick={e => props.editar(instrutor.id)}>
                                Editar
                    </button> */}
                    <button type="button" 
                            className="btn btn-danger" 
                            onClick={e => props.deletar(instrutor)}>
                                Deletar
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Data Admissão</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </table>
    )
}