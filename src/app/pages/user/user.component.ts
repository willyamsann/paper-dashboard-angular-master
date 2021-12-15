import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FinanceApi } from "../../models/finance-api";
import { FinanceService } from "../../services/finance-service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "user-cmp",
  moduleId: module.id,
  templateUrl: "user.component.html",
})
export class UserComponent implements OnInit {
  finance: FinanceApi = {};

  financeId: number;
  isEdit: boolean = false;
  constructor(
    private financeService: FinanceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.financeId = Number(this.route.snapshot.paramMap.get("id"));
    if (this.financeId !== 0) {
      this.isEdit = true;
      this.getDetails();
    }
  }

  saveFinance() {
    this.financeService.saveFinance(this.finance).subscribe(() => {
      this.finance = {};
      console.log("OK");
    });
  }
  updateFinance() {
    this.finance.id = this.financeId;
    this.financeService.updateFinance(this.finance).subscribe(() => {
      this.finance = {};
      console.log("OK");
    });
  }

  getDetails() {
    this.financeService
      .getFinanceById(this.financeId)
      .subscribe((finace: FinanceApi) => {
        this.finance = finace;
      });
  }
}
