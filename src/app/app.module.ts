import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injectable, ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import * as Sentry from "@sentry/browser";
import { Integrations as TracingIntegrations } from "@sentry/tracing";
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

  integrations: [new TracingIntegrations.BrowserTracing()],
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

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}

  extractError(error) {
    // Try to unwrap zone.js error.
    // https://github.com/angular/angular/blob/master/packages/core/src/util/errors.ts
    if (error && error.ngOriginalError) {
      error = error.ngOriginalError;
    }

    // We can handle messages and Error objects directly.
    if (typeof error === "string" || error instanceof Error) {
      return error;
    }

    // If it's http module error, extract as much information from it as we can.
    if (error instanceof HttpErrorResponse) {
      // The `error` property of http exception can be either an `Error` object, which we can use directly...
      if (error.error instanceof Error) {
        return error.error;
      }

      // ... or an`ErrorEvent`, which can provide us with the message but no stack...
      if (error.error instanceof ErrorEvent) {
        return error.error.message;
      }

      // ...or the request body itself, which we can use as a message instead.
      if (typeof error.error === "string") {
        return `Server returned code ${error.status} with body "${error.error}"`;
      }

      // If we don't have any detailed information, fallback to the request message itself.
      return error.message;
    }

    // Skip if there's no error, and let user decide what to do with it.
    return null;
  }

  handleError(error) {
    const extractedError = this.extractError(error) || "Handled unknown error";
    const eventId = Sentry.captureException(extractedError);
    Sentry.captureException(error.originalError || error);
    // Sentry.showReportDialog({ eventId });
    console.error(error);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AutoplayComponent,
    TracingComponent,
    Tracing2Component,
    Tracing3Component,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
