import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tutorial } from './tutorial';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiUrl + '/api/tutorials';
  }

  getAll() {
    return this.http.get<Tutorial[]>(this.baseUrl);
  }

  get(id: string) {
    return this.http.get<Tutorial>(`${this.baseUrl}/${id}`);
  }

  create(data: Tutorial) {
    return this.http.post<Tutorial>(this.baseUrl, data);
  }

  update(id: string, data: Tutorial) {
    return this.http.put<Tutorial>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title: string) {
    return this.http.get<Tutorial[]>(`${this.baseUrl}?title=${title}`);
  }
}
