import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherSearchComponent} from './weather-search.component';
import {WeatherSearchRoutingModule} from './weather-search-routing.modeule';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    WeatherSearchComponent
  ],
  imports: [
    CommonModule,
    WeatherSearchRoutingModule,
    ReactiveFormsModule,
  ]
})
export class WeatherSearchModule {}
