import React from 'react'

export default props => {

    const rows = props.treinos.map( treino => {
        return (
            <tr key={treino.id}>
                <td>{treino.nome}</td>
                <td>{treino.aluno.nome}</td>
                <td>
                    {/* <button type="button" 
                            className="btn btn-primary"
                            onClick={e => props.editar(treino.id)}>
                                Consultar Exercícios
                    </button> */}
                    <button type="button" 
                            className="btn btn-danger" 
                            onClick={e => props.deletar(treino)}>
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
                    <th scope="col">Aluno</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </table>
    )
}