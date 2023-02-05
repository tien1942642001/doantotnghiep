import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NamHoiAnComponent } from './nam-hoi-an/nam-hoi-an.component';
import { NhaTrangComponent } from './nha-trang/nha-trang.component';
import { PhuQuocComponent } from './phu-quoc/phu-quoc.component';

const routes: Routes = [
  {
    path: "nam-hoi-an",
    component: NamHoiAnComponent,
  },
  {
    path: "phu-quoc",
    component: PhuQuocComponent,
  },
  {
    path: "nha-trang",
    component: NhaTrangComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PopulationRoutingModule { }
