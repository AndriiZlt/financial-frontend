import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { AuthModule } from "./auth/auth.module";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NotificationPipe } from "./pipes/sort.pipe";
import { ToggleModeComponent } from "./components/header/toggle-mode/toggle-mode.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    SettingsComponent,
    NotificationPipe,
    ToggleModeComponent,
  ],
  imports: [CommonModule, AuthModule, HttpClientModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    SettingsComponent,
  ],
})
export class CoreModule {}
