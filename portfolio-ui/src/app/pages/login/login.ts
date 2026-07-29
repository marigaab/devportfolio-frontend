import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  senha = '';
  erro = false;

  constructor(private router: Router) {}
fazerLogin(): void {
    // Validação mokada para teste rápido
    if (this.email === 'admin@email.com' && this.senha === '123456') {
      this.erro = false;
      // Salva uma flag visual de autenticação (opcional)
      localStorage.setItem('usuarioLogado', 'true');
      
      // Redireciona diretamente para o Painel Admin
      this.router.navigate(['/admin']);
    } else {
      this.erro = true;
    }
  }
}
