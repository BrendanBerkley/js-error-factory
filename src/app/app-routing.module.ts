import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AutoplayComponent } from "./autoplay/autoplay.component";

export const routes: Routes = [
  {
    path: "autoplay",
    component: AutoplayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
