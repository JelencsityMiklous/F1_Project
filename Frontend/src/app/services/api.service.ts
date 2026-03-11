import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }


  private server = 'http://localhost:4444';

  selectAll(table: string){
    return this.http.get(`${this.server}/${table}`);
  }

  select(table: string, id: number){
    return this.http.get(`${this.server}/${table}/${id}`);
  }

  delete(table: string, id: number){
    return this.http.delete(`${this.server}/${table}/${id}`);
  }

  insert(table: string, data: any){
    return this.http.post(`${this.server}/${table}`, data);
  }

  update(table: string, id: number, data: any){
    return this.http.patch(`${this.server}/${table}/${id}`, data);
  }

}
