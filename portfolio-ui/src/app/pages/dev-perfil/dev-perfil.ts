import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { ProjetoCard } from '../../components/projeto-card/projeto-card';
import { Perfil } from '../../models/perfil';
import { Projeto } from '../../models/projeto';
import { PerfilService } from '../../services/perfil';
import { ProjetoService } from '../../services/projeto';

@Component({
  selector: 'app-dev-perfil',
  standalone: true,
  imports: [CommonModule, Navbar, ProjetoCard],
  templateUrl: './dev-perfil.html',
  styleUrl: './dev-perfil.css',
})
export class DevPerfil implements OnInit {
  perfil?: Perfil;
  projetos: Projeto[] = [];

  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilService,
    private projetoService: ProjetoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Escuta mudanças nos parâmetros da URL (ex: /dev/1, /dev/2)
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const devId = idParam ? Number(idParam) : 1;
      this.carregarPerfilEProjetos(devId);
    });
  }

  carregarPerfilEProjetos(devId: number): void {
    // 1. Busca os perfis para encontrar o Dev correto
    this.perfilService.listarTodos().subscribe({
      next: (perfis: Perfil[]) => {
        // Tenta encontrar por id do perfil ou por usuarioId
        const devEncontrado = perfis.find(p => p.id === devId || p.usuarioId === devId);
        
        if (devEncontrado) {
          this.perfil = devEncontrado;
          
          // 2. Busca e Filtra APENAS os projetos deste desenvolvedor
          this.carregarProjetosDoDev(devEncontrado.usuarioId || devEncontrado.id || devId);
        } else {
          this.perfil = perfis.length > 0 ? perfis[0] : undefined;
          this.projetos = [];
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar perfil:', err);
        this.cdr.detectChanges();
      }
    });
  }

  carregarProjetosDoDev(usuarioId: number): void {
  this.projetoService.buscarPorUsuario(usuarioId).subscribe({
    next: (projetosDoDev: Projeto[]) => {
      this.projetos = projetosDoDev;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Erro ao buscar projetos:', err);
      this.projetos = [];
      this.cdr.detectChanges();
    }
  });
}
}