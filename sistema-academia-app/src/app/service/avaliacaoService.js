import ApiService from '../apiservice'

export default class AvaliacaoService extends ApiService {

    constructor() {
        super('/api/avaliacaoFisica')
    }

    buscarTodos() {
        return this.get('')
    }

    salvar(avaliacaoDTO) {
        return this.post('', avaliacaoDTO)
    }

    consultarPorAluno(aluno) {
        return this.get(`/aluno/${aluno}`)
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }
}