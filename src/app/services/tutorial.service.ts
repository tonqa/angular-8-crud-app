import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tutorial } from './tutorial';

const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  get(id: string) {
    return this.http.get<Tutorial>(`${baseUrl}/${id}`);
  }

  create(data: Tutorial) {
    return this.http.post<Tutorial>(baseUrl, data);
  }

  update(id: string, data: Tutorial) {
    return this.http.put<Tutorial>(`${baseUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: string) {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
}
