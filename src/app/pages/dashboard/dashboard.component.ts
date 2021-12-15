import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { Finance } from "../../models/finance";
import { FinanceApi } from "../../models/finance-api";
import { FinanceService } from "../../services/finance-service";
import { Router } from "@angular/router";

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  financeApi: FinanceApi[];

  valorTotal = 0;
  saida = 0;
  entrada = 0;
  investimentos = 0;
  financeModel: Finance = {
    tipo: "Entrada",
    valor: 888,
    data: "12/01/2020",
  };

  //objeto da model
  financa: Finance = {
    tipo: "Entrada",
    valor: 888,
    data: "12/01/2020",
  };

  //array de objeto da model
  financas: Finance[] = [];

  //array tradicional
  finance = [
    {
      tipo: "Entrada",
      valor: 2650,
      data: "20/02/2021",
    },
    {
      tipo: "Saida",
      valor: 980,
      data: "20/02/2021",
    },
    {
      tipo: "Entrada",
      valor: 20,
      data: "20/02/2021",
    },
    {
      tipo: "Saida",
      valor: 9870,
      data: "20/02/2021",
    },
    {
      tipo: "Investimento",
      valor: 20000,
      data: "20/02/2021",
    },
    {
      tipo: "Entrada",
      valor: 200,
      data: "20/02/2021",
    },
  ];

  constructor(private financeService: FinanceService, private router: Router) {}

  ngOnInit() {
    this.financas.push(this.financa);
    this.loadLocalStorange();
    this.somaSaidas();
    this.somaInvestimento();
    this.somaEntrada();
    this.somaTotal();
    this.getFinances();

    this.chartColor = "#FFFFFF";

    this.canvas = document.getElementById("chartHours");
    this.ctx = this.canvas.getContext("2d");

    this.chartHours = new Chart(this.ctx, {
      type: "line",

      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
        datasets: [
          {
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354],
          },
          {
            borderColor: "#f17e5d",
            backgroundColor: "#f17e5d",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420],
          },
          {
            borderColor: "#fcc468",
            backgroundColor: "#fcc468",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484],
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },

        tooltips: {
          enabled: false,
        },

        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: "rgba(255,255,255,0.05)",
              },
            },
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f",
              },
            },
          ],
        },
      },
    });

    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");
    this.chartEmail = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: [1, 2, 3],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
            borderWidth: 0,
            data: [342, 480, 530, 120],
          },
        ],
      },

      options: {
        legend: {
          display: false,
        },

        pieceLabel: {
          render: "percentage",
          fontColor: ["white"],
          precision: 2,
        },

        tooltips: {
          enabled: false,
        },

        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "rgba(255,255,255,0.05)",
              },
            },
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                display: false,
              },
            },
          ],
        },
      },
    });

    var speedCanvas = document.getElementById("speedChart");

    var dataFirst = {
      data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
      fill: false,
      borderColor: "#fbc658",
      backgroundColor: "transparent",
      pointBorderColor: "#fbc658",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataSecond = {
      data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: false,
      borderColor: "#51CACF",
      backgroundColor: "transparent",
      pointBorderColor: "#51CACF",
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var speedData = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [dataFirst, dataSecond],
    };

    var chartOptions = {
      legend: {
        display: false,
        position: "top",
      },
    };

    var lineChart = new Chart(speedCanvas, {
      type: "line",
      hover: false,
      data: speedData,
      options: chartOptions,
    });
  }

  somaTotal() {
    this.valorTotal = this.entrada - this.saida;
  }

  somaSaidas() {
    var soma = this.finance
      .map((item) => item.valor)
      .reduce((prev, curr) => prev + curr, 0);
    for (let alt = 0; alt < this.financas.length; alt++) {
      if (this.financas[alt].tipo === "Saida") {
        this.saida += this.financas[alt].valor?.valueOf() || 0;
      }
      this.financas[alt].tipo === "Saida" ? 0 : 10;
    }
    console.log(soma);
  }
  somaEntrada() {
    for (let alt = 0; alt < this.financas.length; alt++) {
      if (this.financas[alt].tipo === "Entrada") {
        this.entrada += this.financas[alt].valor?.valueOf() || 0;
      }
    }
  }
  somaInvestimento() {
    for (let alt = 0; alt < this.financas.length; alt++) {
      if (this.financas[alt].tipo === "Investimento") {
        this.investimentos += this.financas[alt].valor?.valueOf() || 0;
      }
    }
  }

  excluirItem(id: number | string) {
    this.financas.splice(Number(id), 1);
    console.log("EXCLUIR");

    this.valorTotal = 0;
    this.saida = 0;
    this.entrada = 0;
    this.investimentos = 0;
    this.somaSaidas();
    this.somaInvestimento();
    this.somaEntrada();
    this.somaTotal();
    this.saveLocalStorange();
  }

  createFinance() {
    if (
      (this.financeModel.tipo === "Saida" &&
        this.financeModel.valor?.valueOf) ||
      0 > 1000
    ) {
      return;
    }
    this.financas.push({
      tipo: this.financeModel.tipo,
      valor: this.financeModel.valor,
      data: this.financeModel.data,
    });
    this.valorTotal = 0;
    this.saida = 0;
    this.entrada = 0;
    this.investimentos = 0;
    this.somaSaidas();
    this.somaInvestimento();
    this.somaEntrada();
    this.somaTotal();
    this.saveLocalStorange();
  }

  recalcular() {
    this.valorTotal = 0;
    this.saida = 0;
    this.entrada = 0;
    this.investimentos = 0;
    this.somaSaidas();
    this.somaInvestimento();
    this.somaEntrada();
    this.somaTotal();
    this.saveLocalStorange();
  }

  saveLocalStorange() {
    if (localStorage.length != 0) {
      if (!localStorage.getItem("local_fuctura")) {
        localStorage.setItem("local_fuctura", JSON.stringify(this.financas));
      } else {
        localStorage.removeItem("local_fuctura");
        localStorage.setItem("local_fuctura", JSON.stringify(this.financas));
      }
    }
  }

  loadLocalStorange() {
    if (localStorage.length != 0) {
      if (localStorage.getItem("local_fuctura")) {
        let financas = localStorage.getItem("local_fuctura");
        this.financas = JSON.parse(financas || "");
      }
    }
  }

  getFinances() {
    this.financeService.getFinance().subscribe((financeApis: FinanceApi[]) => {
      this.financeApi = financeApis;
      console.log(this.financeApi);
    });
  }

  details(id: number) {
    this.router.navigate(["/user", { id: id }]);
  }

  deleteById(id: number) {
    this.financeService.deleteById(id).subscribe(() => {
      console.log("OK");
      this.getFinances();
    });
  }
}
