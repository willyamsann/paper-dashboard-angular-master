import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { FinanceApi } from "../models/finance-api";
import { Finance } from "app/models/finance";

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

  getFinanceById(id: number): Observable<FinanceApi> {
    return this.httpClient
      .get<FinanceApi>(this.url + "/projetos/" + id)
      .pipe(retry(2));
  }

  saveFinance(Financeapi: FinanceApi): Observable<FinanceApi> {
    var json = JSON.stringify(Financeapi);
    return this.httpClient
      .post<FinanceApi>(this.url + "/projetos", json, this.httpOptions)
      .pipe(retry(2));
  }

  updateFinance(Financeapi: FinanceApi): Observable<FinanceApi> {
    return this.httpClient.put<FinanceApi>(
      this.url + "/projetos/" + Financeapi.id,
      JSON.stringify(Financeapi),
      this.httpOptions
    );
  }

  deleteById(id: number) {
    return this.httpClient
      .delete(this.url + "/projetos/" + id, this.httpOptions)
      .pipe(retry(2));
  }
}
