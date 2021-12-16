import { Component, OnInit, OnDestroy } from "@angular/core";
("@angular/core");
import { User } from "../../models/user";
import { AuthenticationService } from "../../services/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { data } from "jquery";

@Component({
  selector: "login-component",
  templateUrl: "login.component.html",
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl = false;
  error = "";

  user: User;
  email: string = "willyam@gmail.com";
  senha: string = "Senha@0908";

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user = new User();
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onSubmit() {
    console.log(this.senha);
    console.log(this.email);
    console.log(this.user);

    this.authService
      .login(this.email, this.senha)
      .pipe(first())
      .subscribe(
        (data) => {},
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
