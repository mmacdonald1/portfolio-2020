import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./components/about/about.component";
import { HomeComponent } from "./components/home/home.component";
import { SkillsComponent } from "./components/skills/skills.component";
import { WorkComponent } from "./components/work/work.component";

const routes: Routes = [
  { path: "work", component: WorkComponent },
  { path: "skills", component: SkillsComponent },
  { path: "hire", component: AboutComponent },
  { path: "home", component: HomeComponent },
  { path: "", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
