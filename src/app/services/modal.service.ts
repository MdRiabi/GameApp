import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  private modals: IModal[] = [];

  private adsList: string[];
  constructor() {
    /* this.adsList = [
      "ads1",
      "ads2",
      "ads3",
      "ads4",
      "ads5",
      "",
      "ads6",
    ]; */
  }

/*  getsheduledAds(intervalInseconds: number): Observable<string> {
    return new Observable<string>((observer) => {
       observer.next();
       observer.error();
       observer.complete(); 
      let counter = 0;
      let adsTimer = setInterval(() => {
        console.log("from setinterval");
        observer.next(this.adsList[counter]);
        counter++;

        if (counter == this.adsList.length) {
          observer.complete();
        }
        if (this.adsList[counter] == "") {
          observer.error("Error: Empty ADS");
        }
        
      }, intervalInseconds * 1000);

      return{
        unsubscribe() {
          // will be called :
           1- error
          2- complete
          3- unsubscribe 
          clearInterval(adsTimer);
          
        },
      }



    });
  } */


  //solve the memory leak
  unregister(id: string) {

    this.modals = this.modals.filter(
      element => element.id !== id
    )
  }



  register(id: string) {
    this.modals.push({
      id,
      visible: false
    })
    console.log(this.modals)

  }
  /*  !!this.modals.find(element => element.id === id)?.visible 
  =
  Boolean(this.modals.find(element => element.id === id)?.visible)
  */


  isModalOpen(id: string): boolean {
    return !!this.modals.find(element => element.id === id)?.visible
  }

  toggleModal(id: string) {
    /*   this.visible = !this.visible
     */

    const modal = this.modals.find(element => element.id === id);

    if (modal) {
      modal.visible = !modal.visible;

    }

  }


  // observable








}
