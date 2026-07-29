import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-sobre',
  imports: [CommonModule, Navbar],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {}
