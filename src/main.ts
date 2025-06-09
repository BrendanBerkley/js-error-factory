import { ErrorHandler, importProvidersFrom } from "@angular/core";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { AppRoutingModule } from "./app/app-routing.module";
import { AppComponent } from "./app/app.component";
import * as Sentry from "@sentry/angular";

Sentry.init({
  dsn: "",
  environment: "dev",
  release: "1.0",
  integrations: [],
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

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    { provide: ErrorHandler, useValue: Sentry.createErrorHandler() },
  ],
}).catch((err) => console.error(err));
