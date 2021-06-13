import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

  chart: any;
  DashList: any[];
  interval: NodeJS.Timer;

  constructor(private service: SharedService) { }

  ngOnInit() {

    this.refreshDashList();

    this.interval = setInterval(() => {
      this.service.getRegistroRamList()
        .subscribe(res => {
          console.log(res);

          //let name = res[res.length-1].map(res => res[res.length-1].nomeComponente)
          let name = res.map(res => res.nomeComponente);
          // let data = res.map(res => res.data.split(" ")[0]);
          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);

          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: '% em Uso de Memória RAM',
                  data: dado,
                  borderColor: function (dado) {
                    return dado.dataset.data[dado.dataset.data.length - 1] < 40 ? '#022cc22'
                      : dado.dataset.data[dado.dataset.data.length - 1] < 85 ? '#64bd36'
                        : '#ff2020'
                  },
                  pointRadius: 10,
                  fill: false
                }, {
                  label: 'Perigo',
                  data: [85,85,85,85,85,85,85,85,85,85],
                  borderColor: '#ff2020',
                  fill: false                
                },
              ],
            },
            options: {
              animation: {
                duration: 0
              },
              responsive: false,
              legend: {
                display: true
              },
              scales: {
                xAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Horário',
                    fontSize: 18,
                  },
                  ticks: {
                    maxTicksLimit: 10
                  },
                }],
                yAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: '% em Uso',
                    fontSize: 18
                  },
                  ticks: {
                    callback: function (data) {
                      return data + '%';
                    },
                    suggestedMax: 100,
                    beginAtZero: true
                  }
                }]
              },
              plugins: {            
                datalabels: {
                  enabled: true,
                  align: 'end',
                  anchor: 'end',
                  font: {
                    size: 11,
                    weight: 600
                  },
                  offset: 4,
                  padding:0,
                  formatter: function(dado) {
                      return dado.dataset.data[dado.dataset.data.length-1] < 40 ? "Normal"                       
                        : dado.dataset.data[dado.dataset.data.length-1] < 85 ? "Bom"
                        : "Cuidado!" 
                  }              
                }
              }
            }
          })
    })
  }, 2000);

}

refreshDashList() {
  this.service.getConfigList().subscribe(data => {
    this.DashList = data;
  });
}

  // updateChart(element) {
  //   this.chart.data.datasets[0].data.push(element.dadosColetados);
  //   this.chart.data.labels[0].push(element.data.split(" ")[1]);
  //   this.chart.update();
  // }
  
}

