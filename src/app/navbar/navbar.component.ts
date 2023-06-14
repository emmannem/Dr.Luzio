import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/localStorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void { }
  constructor(
    private cache: LocalStorageService,
  ) { }

  cerrarSesion() {
    this.cache.clear();
  }
}
