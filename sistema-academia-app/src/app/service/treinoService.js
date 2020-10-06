import ApiService from '../apiservice'

export default class TreinoService extends ApiService {

    constructor() {
        super('/api/treinos')
    }

    buscarTodos() {
        return this.get('')
    }

    salvar(treinoDTO) {
        return this.post('', treinoDTO)
    }

    consultarPorAluno(aluno) {
        return this.get(`/aluno/${aluno}`)
    }

    buscarPorIdUsuario(id) {
        return this.get(`/${id}`)
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }
}