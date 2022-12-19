import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 /*  isAuthenticated = false; */
  constructor(
    public modalServ: ModalService, 
    public authServ: AuthService,
    public angularFireAuth: AngularFireAuth) {
   /* this.authServ.isAuthenticated$.subscribe(status =>{
    this.isAuthenticated = status
   }) */
   }

  ngOnInit(): void {
  }

  openModal($evnt: Event){

    $evnt.preventDefault();
    this.modalServ.toggleModal('auth');
  }
  async logout($event: Event){
    $event.preventDefault();
    await  this.angularFireAuth.signOut();


  }

}
