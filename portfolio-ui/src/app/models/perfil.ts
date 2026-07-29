export interface Perfil {
  id?: number;
  usuarioId?: number;
  nome: string;
  cargo: string;
  bio?: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  fotoUrl?: string;
}
