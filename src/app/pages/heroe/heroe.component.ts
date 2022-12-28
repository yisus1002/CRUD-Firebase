import { HeroeModel } from './../../models/heroe.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe:HeroeModel = new HeroeModel();

  constructor(private _Sheroe:HeroesService,
              private route: ActivatedRoute,
              private router:Router,
                  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if( id!=="nuevo"){
      this._Sheroe.gettHeroeID(id)
      .subscribe({
        next: (data:HeroeModel)=>{
          // console.log(data);
          this.heroe=data;
          this.heroe.id=id?.toString();
          // this.router.navigate(['/heroes'])
        },
        error: (error:any)=>{
          this.router.navigate(['/heroes'])
          console.log(error);
          
        }
      });
    }
    
  }

  guardar(f:NgForm){
    if(f.invalid){
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Formulario invalido',
        showConfirmButton: false,
        timer: 1500
      })
      
      return;
    }
    console.log(f);
    console.log(this.heroe);
    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: ()=>{
        // Swal.showLoading()
      }
    });
    if(this.heroe?.id){
      this.putHeroe();
    }else{
        this.postHeroe();
    }
  }

  postHeroe(){
    this._Sheroe.postHeroe(this.heroe)
    .subscribe({
      next: (data:any)=>{
        console.log(data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se creo un heroe',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (error:any)=>{
        console.log(error);
      }
    });
  }
  putHeroe(){
    this._Sheroe.puttHeroe(this.heroe)
    .subscribe({
      next: (data:any)=>{
        console.log(data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se actualizo correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (error:any)=>{
        console.log(error);
      }
    });  
  }
}

