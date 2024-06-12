import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages/pages.component";
import { MyAssetsComponent } from "src/app/features/my-assets/my-assets.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [{ path: "", component: MyAssetsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
