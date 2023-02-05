import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NamHoiAnComponent } from './nam-hoi-an/nam-hoi-an.component';
import { PhuQuocComponent } from './phu-quoc/phu-quoc.component';
import { NhaTrangComponent } from './nha-trang/nha-trang.component';
import { PopulationRoutingModule } from './population-routing.module';



@NgModule({
  declarations: [
    NamHoiAnComponent,
    PhuQuocComponent,
    NhaTrangComponent
  ],
  imports: [
    CommonModule,
    PopulationRoutingModule
  ]
})
export class PopulationModule { }
