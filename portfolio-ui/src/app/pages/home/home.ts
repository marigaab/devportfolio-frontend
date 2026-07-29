import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { ProjetoCard } from '../../components/projeto-card/projeto-card';
import { Projeto } from '../../models/projeto';
import { Perfil } from '../../models/perfil';
import { ProjetoService } from '../../services/projeto';
import { PerfilService } from '../../services/perfil';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar, ProjetoCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  projetos: Projeto[] = [];
  listaPerfis: Perfil[] = [];

  constructor(
    private projetoService: ProjetoService,
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef // 👈 Injetado para renderizar os cards assim que chegarem do MySQL
  ) {}

  ngOnInit(): void {
    this.carregarPerfis();
    this.carregarProjetos();
  }

  carregarPerfis(): void {
    this.perfilService.listarTodos().subscribe({
      next: (perfis: Perfil[]) => {
        this.listaPerfis = perfis;
        this.cdr.detectChanges(); // 👈 Força a renderização imediata na Home
      },
      error: (err: unknown) => {
        console.error('Erro ao carregar perfis na Home:', err);
        this.listaPerfis = [];
        this.cdr.detectChanges();
      }
    });
  }

  carregarProjetos(): void {
    this.projetoService.listarTodos().subscribe({
      next: (dados: Projeto[]) => {
        this.projetos = dados;
        this.cdr.detectChanges(); // 👈 Renderiza os projetos assim que chegam
      },
      error: () => {
        this.projetos = [];
        this.cdr.detectChanges();
      }
    });
  }
}