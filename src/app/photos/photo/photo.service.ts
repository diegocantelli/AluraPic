import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ //indica que esse servico pode ser injetado em outras classes e tambem pode receber injecao de dependencia
  providedIn: 'root' //todos os componentes que fizerem uso desse serviço irão usar a mesma instância
})
export class PhotoService {

  constructor(private http: HttpClient) {}

  listFromUser(userName: string): Observable<Object[]> {
    return this.http
      .get<Object[]>('http://localhost:3000/flavio/photos')
  }
}
