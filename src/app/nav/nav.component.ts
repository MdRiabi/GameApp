import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public modalServ: ModalService) { }

  ngOnInit(): void {
  }

  openModal($evnt: Event){

    $evnt.preventDefault();
    this.modalServ.toggleModal();
  }

}
