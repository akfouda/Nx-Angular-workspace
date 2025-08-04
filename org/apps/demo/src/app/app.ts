/* eslint-disable @nx/enforce-module-boundaries */
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRepository } from './test.service';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',


})
export class App {
  protected title = 'demo';
  repo = inject(UserRepository);
  constructor(){
    this.repo.findAll().subscribe(console.log);
}
}
