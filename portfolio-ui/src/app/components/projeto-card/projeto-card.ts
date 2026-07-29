import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Projeto } from '../../models/projeto';

@Component({
  selector: 'app-projeto-card',
  imports: [CommonModule],
  templateUrl: './projeto-card.html',
  styleUrl: './projeto-card.css',
})
export class ProjetoCard {
  @Input({ required: true }) projeto!: Projeto;
}
