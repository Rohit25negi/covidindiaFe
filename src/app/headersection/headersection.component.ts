import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headersection',
  templateUrl: './headersection.component.html',
  styleUrls: ['./headersection.component.css']
})
export class HeadersectionComponent implements OnInit {

  constructor() { }
  muted: boolean = true
  ngOnInit(): void {
  }
  muteAudio(event: any){
    document.getElementById('myVideo').setAttribute('muted',String(this.muted));
    this.muted = !this.muted;

  }

}
