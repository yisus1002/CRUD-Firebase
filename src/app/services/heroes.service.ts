import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  api:string = "https://crud-firebase-1a605-default-rtdb.firebaseio.com";
  
  constructor(
    private http:HttpClient,
    ) { }

    postHeroe(heroe:HeroeModel):Observable<HeroeModel>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true', 
      })  

      return this.http.post<any>(`${this.api}/heroes.json`, JSON.stringify(heroe), {headers:headers})
      .pipe(
        map( (resp:any)=>{
          heroe.id =resp.name;
          return heroe;
        }))
    }
    puttHeroe(heroe:HeroeModel):Observable<HeroeModel>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true', 
      });
      const heroeTemp = {
        ...heroe
      }
      delete heroeTemp?.id;

      return this.http.put<any>(`${this.api}/heroes/${heroe?.id}.json`, JSON.stringify(heroeTemp), {headers:headers})
    }
    gettHeroes():Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true', 
      });

      return this.http.get<any>(`${this.api}/heroes/.json`, {headers:headers})
      .pipe(
        map( (resp:any)=>{
          return this.crearArray(resp);
        })) 
    }

    private crearArray(heroesObj: any){
           const heroes:HeroeModel[]=[];

           if(heroesObj===null){return [];};

           Object.keys(heroesObj).forEach((key:any)=>{
            const heroe:HeroeModel = heroesObj[key];
            heroe.id =key;

            heroes.push(heroe)
           })
       return heroes;
    }

    gettHeroeID(id:any):Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true', 
      });

      return this.http.get<any>(`${this.api}/heroes/${id}.json`, {headers:headers})
    }
    deletHeroeID(id:any):Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true', 
      });

      return this.http.delete<any>(`${this.api}/heroes/${id}.json`, {headers:headers})
    }
}
