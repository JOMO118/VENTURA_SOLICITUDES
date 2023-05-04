import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoliticasService {

  public urlServer = "https://jsonplaceholder.typicode.com/posts/";

  constructor( public http: HttpClient) {
    
   }

   getPoliticas(){
    return new Promise(resolve=>{
      this.http.get(this.urlServer).subscribe(data=>{
        resolve(data);
      },error=>{
        console.log(error)
      })
    })
   }

  
}
