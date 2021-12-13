import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FinanceApi } from "../../models/finance-api";
import { FinanceService } from "../../services/finance-service";
@Component({
  selector: "user-cmp",
  moduleId: module.id,
  templateUrl: "user.component.html",
})
export class UserComponent implements OnInit {
  finance: FinanceApi = {};
  constructor(private financeService: FinanceService) {}
  ngOnInit() {}

  saveFinance() {
    this.financeService.saveFinance(this.finance).subscribe(() => {
      this.finance = {};
      console.log("OK");
    });
  }
}
