import React from 'react'

export default props => {

    const rows = props.alunos.map( aluno => {
        return (
            <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>{aluno.cpf}</td>
                <td>{aluno.rg}</td>
                <td>
                    {/* <button type="button" 
                            className="btn btn-primary"
                            onClick={e => props.editar(aluno.id)}>
                                Editar
                    </button> */}
                    <button type="button" 
                            className="btn btn-danger" 
                            onClick={e => props.deletar(aluno)}>
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
                    <th scope="col">Email</th>
                    <th scope="col">CPF</th>
                    <th scope="col">RG</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </table>
    )
}