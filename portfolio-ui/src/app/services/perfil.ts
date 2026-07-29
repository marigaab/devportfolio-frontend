import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private readonly API_URL = 'http://localhost:8080/api/perfil';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.API_URL);
  }

  obterPerfil(id?: number): Observable<Perfil> {
    const url = id ? `${this.API_URL}/${id}` : this.API_URL;
    return this.http.get<Perfil>(url);
  }

  // 🚀 1. Envia POST para criar novo
  cadastrar(perfil: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(this.API_URL, perfil);
  }

  // ✏️ 2. Envia PUT com ID na URL para atualizar
  atualizar(id: number, perfil: Perfil): Observable<Perfil> {
    return this.http.put<Perfil>(`${this.API_URL}/${id}`, perfil);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}