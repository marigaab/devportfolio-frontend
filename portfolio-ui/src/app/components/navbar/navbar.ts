import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private router: Router) {}

  // Checa se o chave 'adminLogado' está salva no localStorage
  estaLogado(): boolean {
    return localStorage.getItem('adminLogado') === 'true';
  }

  // Faz o logout limpando a sessão e redirecionando para a home
  logout(): void {
    localStorage.removeItem('adminLogado');
    this.router.navigate(['/']);
  }

  irParaHome(): void {
    this.router.navigate(['/']);
  }
}
