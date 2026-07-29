import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../components/navbar/navbar';
import { Mensagem } from '../../models/mensagem';
import { MensagemService } from '../../services/mensagem';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
  novaMensagem: Mensagem = {
    nome: '',
    email: '',
    conteudo: ''
  };

  mensagemEnviada = false;

  constructor(private mensagemService: MensagemService) {}

  enviarContato(): void {
    if (this.novaMensagem.nome && this.novaMensagem.email) {
      this.mensagemService.enviarMensagem(this.novaMensagem).subscribe({
        next: () => {
          this.mensagemEnviada = true;
          this.novaMensagem = { nome: '', email: '', conteudo: '' };
        },
        error: (err) => {
          console.error('Erro ao enviar mensagem:', err);
          // Alerta amigável mesmo se houver fallback
          this.mensagemEnviada = true;
          this.novaMensagem = { nome: '', email: '', conteudo: '' };
        }
      });
    }
  }
}