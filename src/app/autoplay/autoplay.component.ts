import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-autoplay",
  templateUrl: "./autoplay.component.html",
})
export class AutoplayComponent implements AfterViewInit {
  @ViewChild("video", { static: false })
  video?: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.video.nativeElement.play();
  }
}
