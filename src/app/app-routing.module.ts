import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AutoplayComponent } from "./autoplay/autoplay.component";
import { TracingComponent, Tracing2Component, Tracing3Component } from "./tracing/tracing.component";

export const routes: Routes = [
  {
    path: "autoplay",
    component: AutoplayComponent,
  },
  {
    path: "tracing",
    component: TracingComponent,
  },
  {
    path: "tracing-2",
    component: Tracing2Component,
  },
  {
    path: "tracing-3",
    component: Tracing3Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
