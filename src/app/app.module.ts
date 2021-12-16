import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";
import { JwtInterceptor, ErrorInterceptor } from "../app/helpers/index";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./pages/login/login.component";
import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from "@angular/core";
import localePt from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";

registerLocaleData(localePt, "pt");

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    HttpClientModule,
    FixedPluginModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt",
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: "BRL",
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
