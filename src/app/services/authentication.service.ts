import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "environments/environment";
import { User } from "../models/user";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get cuurenteUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    let body = {
      email: username,
      password: password,
    };

    return this.http
      .post<any>(`${environment.apiUrl}/api/user/login`, body)
      .pipe(
        map((data) => {
          localStorage.setItem("currentUser", JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        })
      );
  }
  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
