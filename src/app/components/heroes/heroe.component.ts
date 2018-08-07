import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
    selector: 'app-heroe',
    templateUrl: './heroe.component.html',
    styles: []
})
export class HeroeComponent {

    private heroe: Heroe = {
        nombre: "",
        bio: "",
        casa: "Marvel",
    }

    nuevo: boolean = false;
    id: string;

    constructor(private _heroesService: HeroesService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {

                    this.activatedRoute.params.subscribe(params => {
                        this.id = params['id'];

                        if(this.id !== 'nuevo'){
                            this._heroesService.getHeroe(this.id)
                            .subscribe(heroe => this.heroe = heroe);
                        }
                    });

                }

    guardar(){

        if(this.id == "nuevo"){
            //insetando
            this._heroesService.nuevoHeore(this.heroe)
            .subscribe( data => {
                    this.router.navigate(['/heroe', data.name]);
            }, error => console.error(error));
        }else{
            //actualizando
            this._heroesService.actualizarHeore(this.heroe, this.id)
            .subscribe( data => {
                    console.log(data);
            }, error => console.error(error));
        }
    }
}
