import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-tracing",
    templateUrl: "./tracing.component.html",
    imports: [RouterLink]
})
export class TracingComponent {
  page = 1;
}

@Component({
    selector: "app-tracing-2",
    templateUrl: "./tracing.component.html",
    imports: [RouterLink]
})
export class Tracing2Component {
  page = 2;
}

@Component({
    selector: "app-tracing-3",
    templateUrl: "./tracing.component.html",
    imports: [RouterLink]
})
export class Tracing3Component {
  page = 3;
}
