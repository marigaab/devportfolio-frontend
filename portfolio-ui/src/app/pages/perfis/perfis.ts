import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Perfil } from '../../models/perfil';
import { PerfilService } from '../../services/perfil';

@Component({
  selector: 'app-perfis',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './perfis.html',
  styleUrl: './perfis.css',
})
export class Perfis implements OnInit {
  listaPerfis: Perfil[] = [];

  constructor(
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef // 👈 Injetado para atualizar a tela no 1º clique
  ) {}

  ngOnInit(): void {
    this.carregarPerfis();
  }

  carregarPerfis(): void {
    this.perfilService.listarTodos().subscribe({
      next: (dados: Perfil[]) => {
        this.listaPerfis = dados;
        this.cdr.detectChanges(); // 👈 Força a renderização imediata dos cards
      },
      error: (err) => {
        console.error('Erro ao listar perfis:', err);
        this.listaPerfis = [];
        this.cdr.detectChanges();
      }
    });
  }
}