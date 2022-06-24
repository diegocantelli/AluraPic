import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Photo } from "./photo";

@Injectable({ //indica que esse servico pode ser injetado em outras classes e tambem pode receber injecao de dependencia
  providedIn: 'root' //todos os componentes que fizerem uso desse serviço irão usar a mesma instância
})
export class PhotoService {

  constructor(private http: HttpClient) {}

  listFromUser(userName: string): Observable<Photo[]> {
    return this.http
      .get<Photo[]>('http://localhost:3000/'+ userName +'/photos')
  }

  listFromUserPaginated(userName: string, page: number): Observable<Photo[]> {

    const params = new HttpParams().append('page', page.toString())
    return this.http
      .get<Photo[]>('http://localhost:3000/'+ userName +'/photos', { params })
  }
}
