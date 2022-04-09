import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { BoardComponent } from './components/board/board.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BoardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    // BrowserModule,
    FormsModule,
    // HttpClientModule,
    MatNativeDateModule,
    // MaterialExampleModule,
    ReactiveFormsModule,
    // MaterialModule,
    // MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
