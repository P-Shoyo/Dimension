import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})

export class ShowDataComponent implements OnInit {

  chart: any;
  showHeader = false;
  interval: NodeJS.Timer;
  user: string;
  constructor (private service:SharedService) { }

  DashList:any = [];

  ngOnInit() {
    // get data from BD
    // this.refreshDashList();

    var retrievedLogin = localStorage.getItem('funcionario');
    var idFuncionario = JSON.parse(retrievedLogin).idFuncionario;
    this.user = JSON.parse(retrievedLogin).nomeFuncionario;

    this.interval = setInterval(() => {
      this.service.getRegistroRamList(9)
        .subscribe(res => {
          console.log(res);
  
           //let name = res[res.length-1].map(res => res[res.length-1].nomeComponente)
          let name = res.map(res => res.nomeComponente);
          // let data = res.map(res => res.data.split(" ")[0]);
          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);
  
          this.chart = new Chart('canvasRAM', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: '% em Uso da Memória RAM ',
                  data: dado,
                  borderColor: function(dado) {
                    return dado.dataset.data[dado.dataset.data.length-1] < 40 ? '#022cc22'                        
                      : dado.dataset.data[dado.dataset.data.length-1] < 80 ? '#64bd36'
                      : '#ff2020'                    
                }, 
                  fill: false
                }, {
                  type: 'line',
                  label: 'Perigo',
                  data: [85,85,85,85,85,85,85,85,85,85],
                  borderColor: '#f88',
                  fill: false   
                },
              ]
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
                    fontSize: 18
                  },
                  // type: 'time',
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    max: 10
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
                    callback: function(data) {
                      return data + '%';
                    },
                    suggestedMax: 100,
                    beginAtZero: true
                  }
                }]
              },
              plugins: {
                datalabels: {
                  align: 'end',
                  anchor: 'end',
                  color: function(alerta) {
                    var valor = alerta.dataset.dado[alerta.dataIndex];
                    return valor < 20 ? '#022cc22'
                      : valor < 50 ? '#223388'
                      : '#ff2020'
                  },
                  font: {
                    size: 11,
                    weight: 600
                  },
                  offset: 4,
                  padding:0,
                  formatter: function(valor) {
                    return valor < 20 ? "Normal"
                      : valor < 50 ? "Bom"
                      : "Cuidado"
                  }
                }
              }
            }
          })
        })
        
        this.service.getRegistroPlacaList()
        .subscribe(res => {
          console.log(res);
  
           //let name = res[res.length-1].map(res => res[res.length-1].nomeComponente)
          let name = res.map(res => res.nomeComponente);
          // let data = res.map(res => res.data.split(" ")[0]);
          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);
  
          this.chart = new Chart('canvasGPU', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: 'Temperatura da Placa de Vídeo' ,
                  data: dado,
                  borderColor: function(dado) {
                    return dado.dataset.data[dado.dataset.data.length-1] < 40 ? '#022cc22'                        
                      : dado.dataset.data[dado.dataset.data.length-1] < 80 ? '#64bd36'
                      : '#ff2020'                    
                },
                  fill: false
                }, {
                  label: 'Perigo',
                  data: [80,80,80,80,80,80,80,80,80,80],
                  borderColor: '#f88',
                  fill: false                
                },
              ]
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
                    fontSize: 18
                  },
                  ticks: {
                      maxTicksLimit: 10
                    },
                }],
                yAxes: [{
                  display: true, 
                  scaleLabel: {
                    display: true,
                    labelString: 'Temperatura(°C)',
                    fontSize: 18
                  },
                  ticks: {
                    callback: function(data) {
                      return data + '°C';
                    },
                    suggestedMax: 100,
                    beginAtZero: true
                  }
                }]
              },
              plugins: {
                datalabels: {
                  align: 'end',
                  anchor: 'end',
                  color: function(alerta) {
                    var valor = alerta.dataset.dado[alerta.dataIndex];
                    return valor < 20 ? '#022cc22'
                      : valor < 50 ? '#223388'
                      : '#ff2020'
                  },
                  font: {
                    size: 11,
                    weight: 600
                  },
                  offset: 4,
                  padding:0,
                  formatter: function(valor) {
                    return valor < 20 ? "Normal"
                      : valor < 50 ? "Bom"
                      : "Cuidado"
                  }
                 }
              }
            }
          })
        })
  
        this.service.getRegistroCpuList()
        .subscribe(res => {
          console.log(res);
  
           //let name = res[res.length-1].map(res => res[res.length-1].nomeComponente)
          let name = res.map(res => res.nomeComponente);
          // let data = res.map(res => res.data.split(" ")[0]);
          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);
  
          this.chart = new Chart('canvasProcessador', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: '% em Uso do Processador ',
                  data: dado,
                  borderColor: function(dado) {
                    return dado.dataset.data[dado.dataset.data.length-1] < 40 ? '#022cc22'                        
                      : dado.dataset.data[dado.dataset.data.length-1] < 85 ? '#64bd36'
                      : '#ff2020'                    
                },
                  fill: false
                }, {
                  label: 'Perigo',
                  data: [90,90,90,90,90,90,90,90,90,90],
                  borderColor: '#f88',
                  fill: false                
                },
              ]
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
                    fontSize: 18
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
                    callback: function(data) {
                      return data + '%';
                    },
                    suggestedMax: 100,
                    beginAtZero: true
                  }
                }]
              },
              plugins: {
                datalabels: {
                  align: 'end',
                  anchor: 'end',
                  color: function(alerta) {
                    var valor = alerta.dataset.dado[alerta.dataIndex];
                    return valor < 20 ? '#022cc22'
                      : valor < 50 ? '#223388'
                      : '#ff2020'
                  },
                  font: {
                    size: 11,
                    weight: 600
                  },
                  offset: 4,
                  padding:0,
                  formatter: function(valor) {
                    return valor < 20 ? "Normal"
                      : valor < 50 ? "Bom"
                      : "Cuidado"
                  }
                 }
              }
            }
          })
        })

        this.service.getRegistroDiscoList()
        .subscribe(res => {
          console.log(res);
  
           //let name = res[res.length-1].map(res => res[res.length-1].nomeComponente)
          let name = res.map(res => res.nomeComponente);
          // let data = res.map(res => res.data.split(" ")[0]);
          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);
  
          this.chart = new Chart('canvasDisco', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: '% em Uso do Disco ',
                  data: dado,
                  borderColor: function(dado) {
                    return dado.dataset.data[dado.dataset.data.length-1] < 40 ? '#022cc22'                        
                      : dado.dataset.data[dado.dataset.data.length-1] < 85 ? '#64bd36'
                      : '#ff2020'                    
                },
                  fill: false
                }, {
                  label: 'Perigo',
                  data: [90,90,90,90,90,90,90,90,90,90],
                  borderColor: '#f88',
                  fill: false                
                },
              ]
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
                    fontSize: 18
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
                    callback: function(data) {
                      return data + '%';
                    },
                    suggestedMax: 100,
                    beginAtZero: true
                  }
                }]
              },
              plugins: {
                datalabels: {
                  align: 'end',
                  anchor: 'end',
                  color: function(alerta) {
                    var valor = alerta.dataset.dado[alerta.dataIndex];
                    return valor < 20 ? '#022cc22'
                      : valor < 50 ? '#223388'
                      : '#ff2020'
                  },
                  font: {
                    size: 11,
                    weight: 600
                  },
                  offset: 4,
                  padding:0,
                  formatter: function(valor) {
                    return valor < 20 ? "Normal"
                      : valor < 50 ? "Bom"
                      : "Cuidado"
                  }
                 }
              }
            }
          })
        })
    }, 2000);

  }

  refreshDashList() {
    this.service.getRegistroList().subscribe(data => {
      this.DashList = data;
    });
  }

}
