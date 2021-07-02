import { NgModule, Component, Pipe, PipeTransform, enableProdMode, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.css'],
  providers: [DataService]
})
export class Task1Component implements OnInit {

  devices:any;
  constructor(service: DataService, private http:HttpClient) { 
    this.http.get('http://localhost:4200/assets/devices.json').subscribe
    (data => this.devices = data);
  }

  ngOnInit(): void {
  }

}
