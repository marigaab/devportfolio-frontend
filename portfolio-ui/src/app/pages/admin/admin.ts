import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { Projeto } from '../../models/projeto';
import { Mensagem } from '../../models/mensagem';
import { Perfil } from '../../models/perfil';
import { ProjetoService } from '../../services/projeto';
import { MensagemService } from '../../services/mensagem';
import { PerfilService } from '../../services/perfil';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {

  abaAtiva: 'perfil' | 'gerenciar-perfis' | 'projetos' | 'mensagens' = 'perfil';

  projetos: Projeto[] = [];
  mensagens: Mensagem[] = [];
  listaDevs: Perfil[] = [];

  // Modos de Edição
  editandoPerfil = false;
  editandoProjeto = false;

  novoPerfil: Perfil = {
    nome: '', cargo: '', email: '', bio: '', githubUrl: '', linkedinUrl: '', fotoUrl: ''
  };

  novoProjeto: Projeto = {
    titulo: '', descricao: '', tecnologias: '', urlRepositorio: '', urlImagem: ''
  };

  constructor(
    private projetoService: ProjetoService,
    private mensagemService: MensagemService,
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarDevs();
    this.carregarProjetos();
    this.carregarMensagens();
  }

  mudarAba(aba: 'perfil' | 'gerenciar-perfis' | 'projetos' | 'mensagens'): void {
    this.abaAtiva = aba;
    if (aba === 'perfil' || aba === 'gerenciar-perfis' || aba === 'projetos') this.carregarDevs();
    if (aba === 'projetos') this.carregarProjetos();
    if (aba === 'mensagens') this.carregarMensagens();
    this.cdr.detectChanges();
  }

  carregarDevs(): void {
    this.perfilService.listarTodos().subscribe({
      next: (perfis) => { this.listaDevs = perfis; this.cdr.detectChanges(); },
      error: () => { this.listaDevs = []; this.cdr.detectChanges(); }
    });
  }

  // --- CRUD PERFIL ---
  salvarPerfil(): void {
  if (this.editandoPerfil && (this.novoPerfil.id || this.novoPerfil.usuarioId)) {
    const id = this.novoPerfil.id || this.novoPerfil.usuarioId!;
    
    // Chama o PUT exclusivo de atualizar
    this.perfilService.atualizar(id, this.novoPerfil).subscribe({
      next: () => {
        alert('Perfil atualizado com sucesso!');
        this.limparFormPerfil();
        this.mudarAba('gerenciar-perfis');
      }
    });
  } else {
    // Chama o POST exclusivo de cadastrar
    this.perfilService.cadastrar(this.novoPerfil).subscribe({
      next: () => {
        alert('Perfil cadastrado com sucesso!');
        this.limparFormPerfil();
        this.carregarDevs();
      }
    });
  }
}
  prepararEdicaoPerfil(dev: Perfil): void {
    this.novoPerfil = { ...dev };
    this.editandoPerfil = true;
    this.abaAtiva = 'perfil';
  }

  deletarPerfil(id?: number): void {
    if (!id) return;
    if (confirm('Tem certeza que deseja excluir este desenvolvedor?')) {
      this.perfilService.deletar(id).subscribe({
        next: () => { alert('Perfil excluído!'); this.carregarDevs(); }
      });
    }
  }

  limparFormPerfil(): void {
    this.novoPerfil = { nome: '', cargo: '', email: '', bio: '', githubUrl: '', linkedinUrl: '', fotoUrl: '' };
    this.editandoPerfil = false;
  }

  // --- CRUD PROJETO ---
  carregarProjetos(): void {
    this.projetoService.listarTodos().subscribe({
      next: (dados) => { this.projetos = dados; this.cdr.detectChanges(); }
    });
  }

  salvarProjeto(): void {
    if (this.editandoProjeto && this.novoProjeto.id) {
      this.projetoService.atualizar(this.novoProjeto.id, this.novoProjeto).subscribe({
        next: () => {
          alert('Projeto atualizado com sucesso!');
          this.limparFormulario();
          this.carregarProjetos();
        }
      });
    } else {
      const projetoParaSalvar = { ...this.novoProjeto, usuarioId: this.novoProjeto.usuarioId || 1 };
      this.projetoService.salvar(projetoParaSalvar).subscribe({
        next: () => {
          alert('Projeto cadastrado com sucesso!');
          this.carregarProjetos();
          this.limparFormulario();
        }
      });
    }
  }

  prepararEdicaoProjeto(projeto: Projeto): void {
    this.novoProjeto = { ...projeto };
    this.editandoProjeto = true;
  }

  deletarProjeto(id?: number): void {
    if (!id) return;
    if (confirm('Deseja excluir este projeto?')) {
      this.projetoService.deletar(id).subscribe({
        next: () => {
          this.projetos = this.projetos.filter(p => p.id !== id);
          this.cdr.detectChanges();
        }
      });
    }
  }

  limparFormulario(): void {
    this.novoProjeto = { titulo: '', descricao: '', tecnologias: '', urlRepositorio: '', urlImagem: '' };
    this.editandoProjeto = false;
  }

  carregarMensagens(): void {
    this.mensagemService.listarMensagens().subscribe({
      next: (dados) => { this.mensagens = dados; this.cdr.detectChanges(); }
    });
  }
}