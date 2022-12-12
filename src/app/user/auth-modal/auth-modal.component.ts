import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {

  constructor(public modalServ: ModalService) { }

  ngOnInit(): void {
    this.modalServ.register('auth');
    this.modalServ.register('test');
  }

}
