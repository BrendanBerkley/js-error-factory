import { Component, OnInit } from "@angular/core";
import * as Sentry from "@sentry/angular";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    imports: [RouterLink, RouterOutlet]
})
export class AppComponent implements OnInit {
  throwError(unique: boolean) {
    throw `A Generic Error ${unique ? this.hashCode() : ""}`;
  }

  throwEvalError() {
    throw new EvalError(
      'MDN says "EvalError is not used in the current ECMAScript specification and will thus not be thrown by the runtime. However, the object itself remains for backwards compatibility with earlier versions of the specification."'
    );
  }

  checkRange(i: number) {
    if (!(i >= 0 && i <= 10)) {
      throw new RangeError("The number must be between 0 and 10.");
    }
  }

  throwReferenceError() {
    // @ts-ignore
    let a = undefinedVariable;
  }

  throwSyntaxError() {
    eval("nope");
  }

  throwUriError() {
    decodeURIComponent("%");
  }

  hashCode = () => {
    const hash = [];
    for (let i = 0; i < 6; i++) {
      const randomChar = Math.floor(Math.random() * Math.floor(16)).toString(
        16
      );
      hash.push(randomChar);
    }
    return hash.join("");
  };

  throwMultipleErrors = (numberOfErrors: number) => {
    for (let i = 0; i < numberOfErrors; i++) {
      const errorEvent = new ErrorEvent("error");
      window.dispatchEvent(errorEvent);
    }
  };

  throwGenericError() {
    throw new Error("Bulk Generic Error! " + this.hashCode());
  }

  errorWithContext() {
    Sentry.setUser({ id: "1", email: "test@example.com" });
    throw new Error("Error with context");
  }

  customTags() {
    Sentry.withScope((scope) => {
      scope.setTag("two spaces", "SCOPE TAG!!!");
      scope.setTag("null-value", null);
      scope.setTag(null, "null key");
      scope.setTag(undefined, "undefined key");
      scope.setTag("undefined-value", undefined);
      Sentry.captureException(new Error("custom tags"));
    });
  }

  ngOnInit() {
    window.addEventListener("error", (e) => {
      if (e.message === "") {
        this.throwGenericError();
      }
    });
  }
}
