import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './services/modal.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
private abc:Subscription;
  constructor(private modalServ: ModalService) {

  }

  ngOnInit(): void {
    /* 
     let observer = {
       next: (data: string) => {
         console.log(data);
       },
       error: (err: string) => {
         console.log(err);
       },
       complete: () => {
         console.log('ads finised!')
       },
     };
     this.modalServ.getsheduledAds(2).subscribe(observer)
 
    ============================
 
     this.modalServ.getsheduledAds(2).subscribe({
       next: (data: string) => {
         console.log(data);
       },
       error: (err: string) => {
         console.log(err);
       },
       complete: () => {
         console.log('ads finised!')
       },
     }
 
 
 
     )
    =====================
   this.modalServ.getsheduledAds(2).subscribe({
       next: (data: string) => {
         console.log(data);
       }
     }
 
 
    */




   /*  this.modalServ.getsheduledAds(2).subscribe({
      next: (data: string) => {
        console.log(data);
      },
      error: (err: string) => {
        console.log(err);
      },
      complete: () => {
        console.log('ads finised!')
      },
    } */

    let abc: Subscription =   this.modalServ.getsheduledAds(2).subscribe({
      next: (data: string) => {
        console.log(data);
      },
      error: (err: string) => {
        console.log(err);
      },
      complete: () => {
        console.log('ads finised!')
      },
    }
    )
    abc.unsubscribe()

  }

  ngOnDestroy(): void {
    this.abc.unsubscribe();
    
  }

}


/* unsubscription must be declared either in the ngondostroy or after the declaration of the observable */