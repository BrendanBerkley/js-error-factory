import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-autoplay",
    templateUrl: "./autoplay.component.html",
    imports: [RouterLink]
})
export class AutoplayComponent implements AfterViewInit {
  @ViewChild("video", { static: false })
  video?: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.video.nativeElement.play();
  }
}
