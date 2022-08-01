import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import * as Sentry from "@sentry/angular";
import { BrowserTracing } from "@sentry/tracing";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { AutoplayComponent } from "./autoplay/autoplay.component";
import {
  Tracing2Component,
  Tracing3Component,
  TracingComponent,
} from "./tracing/tracing.component";

Sentry.init({
  dsn: "",
  environment: "dev",
  release: "1.0",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],
  // This is overridden by tracesSampler.
  // Comment tracesSampler out if you want everything to report
  tracesSampleRate: 1,
  tracesSampler: (samplingContext) => {
    if (samplingContext.location.href.includes("tracing")) {
      return 1;
    }
    return 0;
  },
});

@NgModule({
  declarations: [
    AppComponent,
    AutoplayComponent,
    TracingComponent,
    Tracing2Component,
    Tracing3Component,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: ErrorHandler,  useValue: Sentry.createErrorHandler()}],
  bootstrap: [AppComponent],
})
export class AppModule {}
