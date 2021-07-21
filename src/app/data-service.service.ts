import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})


export class DataServiceService {


  constructor(private http: HttpClient) { }



  getData(url): Observable<any> {
    return this.http.get(url);
  }
  postData(url, data): Observable<any> {
    return this.http.post(url + '/add', data);
  }
  deleteData(url,Id): Observable<any>{
    return this.http.delete(url + '/delete/'+ Id);
  }
  editData(url,Id): Observable<any> {
    return this.http.get(url+ '/edit/'+ Id);
  }
}
