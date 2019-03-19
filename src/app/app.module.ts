import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { MatrixComponent } from './matrix/matrix.component';
import { MatrixMathComponent } from './matrix-math/matrix-math.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, data: {animation: 'Home'} },
  { path: 'matrix-math', component: MatrixMathComponent, data: {animation: 'MatrixMath'} },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: AppComponent } // Adjust this to a page not found component
]

@NgModule({
  declarations: [
    AppComponent,
    MatrixComponent,
    MatrixMathComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
