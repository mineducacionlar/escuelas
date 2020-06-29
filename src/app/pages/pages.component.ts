import { Component, OnInit } from '@angular/core';

declare function init_plugins(); // 1)

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor() { }

    ngOnInit() {
      init_plugins();
    }
  }


// 1) relacionado con login.component.ts fx init_plugins() {menu y despliegue error del loading que no para }
