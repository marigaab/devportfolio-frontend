import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projeto } from '../models/projeto';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
private readonly API_URL = 'http://147.15.78.144:8080/api/projetos';
  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.API_URL);
  }

  buscarPorId(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.API_URL}/${id}`);
  }

  salvar(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(this.API_URL, projeto);
  }

  atualizar(id: number, projeto: Projeto): Observable<Projeto> {
  return this.http.put<Projeto>(`${this.API_URL}/${id}`, projeto);
}

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
  buscarPorUsuario(usuarioId: number): Observable<Projeto[]> {
  return this.http.get<Projeto[]>(`${this.API_URL}/usuario/${usuarioId}`);
}
}