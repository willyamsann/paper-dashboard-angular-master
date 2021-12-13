import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { FinanceApi } from "../models/finance-api";

@Injectable({
  providedIn: "root",
})
export class FinanceService {
  url = "http://localhost:8080/api/projeto";

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ "content-type": "application/json" }),
  };

  getFinance(): Observable<FinanceApi[]> {
    return this.httpClient
      .get<FinanceApi[]>(this.url + "/projetos")
      .pipe(retry(2));
  }
}
