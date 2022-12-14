import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class ClipComponent implements OnInit {
id = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    /* snapshot is  static so we work with Params */
   /*  this.id = this.route.snapshot.params.id; */
   this.route.params.subscribe((params:Params)=>{
    this.id = params.id
   })
  }

}
