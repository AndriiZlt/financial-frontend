import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { AuthModule } from "./auth/auth.module";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    SettingsComponent,
  ],
  imports: [CommonModule, AuthModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    SettingsComponent,
  ],
})
export class CoreModule {}
