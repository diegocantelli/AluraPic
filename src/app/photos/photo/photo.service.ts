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

  upload(description: string, allowComments: boolean, file: File){
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);
    return this.http.post('http://localhost:3000' + '/photos/upload', formData);
  }

  findById(id: string){
    return this.http.get<Photo>('http://localhost:3000' + '/photos/' + id)
  }
}
