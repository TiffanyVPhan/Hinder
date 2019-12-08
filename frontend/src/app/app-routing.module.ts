import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SettingsComponent } from './settings/settings.component';
import { CandidateComponent } from './candidate/candidate.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', component:LandingPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'sign-up', component: SignupComponent }
  
  // { path: '', component: AppComponent},
  // { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {}
export const routingComponents = [LoginComponent, SettingsComponent, PageNotFoundComponent]

