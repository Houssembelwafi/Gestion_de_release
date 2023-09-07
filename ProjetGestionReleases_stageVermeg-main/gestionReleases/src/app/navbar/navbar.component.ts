import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  isNavbarOpen: boolean = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  ngOnInit(): void {
  }

}
