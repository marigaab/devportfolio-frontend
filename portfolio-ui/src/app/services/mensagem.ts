import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {
private readonly API_URL = 'http://147.15.78.144:8080/api/perfil';
  constructor(private http: HttpClient) {}

  enviarMensagem(mensagem: Mensagem): Observable<Mensagem> {
    return this.http.post<Mensagem>(this.API_URL, mensagem);
  }

  listarMensagens(): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(this.API_URL);
  }
}