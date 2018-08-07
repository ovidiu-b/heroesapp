import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class HeroesService {

    heroesURL: string = "https://heroesapp-d742e.firebaseio.com/heroes.json";
    heroeURL: string = "https://heroesapp-d742e.firebaseio.com/heroes/";

    constructor(private http: HttpClient) { }

    nuevoHeore(heroe: Heroe){
        let body = JSON.stringify(heroe);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.heroesURL, body, { headers:headers }).pipe(map((res: any) => {
            console.log(res);
            return res;
        }));
    }

    actualizarHeore(heroe: Heroe, key$: string){
        let body = JSON.stringify(heroe);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let url = `${this.heroeURL}/${key$}.json`;

        return this.http.put(url, body, { headers:headers }).pipe(map((res: any) => {
            console.log(res);
            return res;
        }));
    }

    getHeroe(key$: string){
        let url = `${this.heroeURL}/${key$}.json`;

        return this.http.get(url).pipe(map((res: any) => {
            console.log(res);
            return res;
        }));
    }
}
