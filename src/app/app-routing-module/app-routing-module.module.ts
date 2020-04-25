import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { GameComponent } from '../game/game.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'training', component: AppComponent },
  { path: 'game', component: GameComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModuleModule { }
