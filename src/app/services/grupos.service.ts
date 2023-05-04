import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(public http: HttpClient) { }

  ListGrupo: any = [
    { id: 1, name: 'BGP' },
    { id: 2, name: 'GP' },
    { id: 3, name: 'OOP' },
  ];
}
