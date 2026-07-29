export interface Projeto {
  id?: number;
  usuarioId?: number;
  titulo: string;
  descricao: string;
  tecnologias: string;
  urlRepositorio?: string;
  urlDeploy?: string;
  urlImagem?: string;
}
