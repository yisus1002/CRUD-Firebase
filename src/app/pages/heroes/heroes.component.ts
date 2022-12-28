import { HeroeModel } from './../../models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  Heroes:HeroeModel[]=[];
  loading:boolean=true;
  constructor(private _sHeroe:HeroesService) { 
    this.getHeroes()
  }

  ngOnInit(): void {

  }
  deletHeroe(id:any, i:any){
    Swal.fire({
      title: 'Esta seguro?',
      text: "Esto no tendra marcha atras!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._sHeroe.deletHeroeID(id)
        .subscribe({
          next: (data:any)=>{
            console.log(data);
            this.Heroes.splice(i, 1);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Se borro un heroe',
              showConfirmButton: false,
              timer: 1500
            })
          },
          error: (error:any)=>{
            console.log(error);
          }
        });
      }
    })

  }

  getHeroes(){
    this.loading=true
    this._sHeroe.gettHeroes()
    .pipe(finalize(()=>{
      this.loading=false
      
    }))
    .subscribe({
      next: (data:any)=>{
        console.log(data);
        this.Heroes=data
        this.loading=false
       
      },
      error: (error:any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: error,
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

}
