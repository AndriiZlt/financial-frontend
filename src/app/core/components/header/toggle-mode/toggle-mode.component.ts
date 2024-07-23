import { Component, OnInit, Renderer2 } from "@angular/core";
import { Mode } from "../models/Mode.model";

@Component({
  selector: "app-toggle-mode",
  templateUrl: "./toggle-mode.component.html",
  styleUrls: ["./toggle-mode.component.scss"],
})
export class ToggleModeComponent implements OnInit {
  currentMode: Mode = Mode.DARK;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    let modeFromLS = localStorage.getItem("mode");
    if (modeFromLS) {
      if (modeFromLS === "dark") {
        this.setMode(Mode.DARK);
      } else {
        this.setMode(Mode.LIGHT);
      }
    } else {
      this.setMode(Mode.DARK);
    }
  }

  setMode(mode: Mode): void {
    this.renderer.removeClass(
      document.body,
      mode === "dark" ? "light" : "dark"
    );
    this.renderer.addClass(document.body, mode === "dark" ? "dark" : "light");
    this.currentMode = mode;
    localStorage.setItem("mode", mode === "dark" ? "dark" : "light");
  }

  toggleMode(): void {
    if (this.currentMode === Mode.LIGHT) {
      this.setMode(Mode.DARK);
    } else {
      this.setMode(Mode.LIGHT);
    }
  }
}
