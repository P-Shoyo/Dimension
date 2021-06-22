import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js'
import { SharedService } from 'src/app/shared.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

  chart: any;
  maquinasList: any[];
  interval: NodeJS.Timer;
  showAlertMessage: boolean;
  showAlertMessage2: boolean;
  user: string;
  
  showComponent: string;
  showComponent2: string;
  statusMessageRam: string;
  statusMessagePlaca: string;
  statusMessageDisco: string;
  statusMessageCpu: string;

  id: any;
  idMaquina: any;
  discoDois: any[];
  statusMessageRam2: string;
  statusMessagePlaca2: string;
  statusMessageCpu2: string;
  discoSecond: any[];
  maquinaID: any;

  
  constructor(
    private service: SharedService,
    private userService: UserService,
    private router: Router) { }
    
    ngOnInit() {

    var retrievedLogin = localStorage.getItem('funcionario');
    var idFuncionario = JSON.parse(retrievedLogin).idFuncionario;
    this.user = JSON.parse(retrievedLogin).nomeFuncionario;
    //console.log('retrievedLogin: ', JSON.parse(retrievedLogin));

    this.userService.getMaquinas(idFuncionario)
      .subscribe((res: any) => { 
        console.log(res);
        this.maquinasList = res;
        // for (let i = 0; i < res.length; i++) {
        //   const element = res[i];
        //   this.idMaquina = element.idMaquina;
        //   console.log(this.idMaquina);          
        // }
        localStorage.setItem('maquina', JSON.stringify(res));
        this.maquinaID = localStorage.getItem('maquina');
      })

    this.showAlertMessage = false;

    this.interval = setInterval(() => {
      this.service.getRegistroRamList(this.maquinasList[0].idMaquina)
        .subscribe(res => {          
          // for (let i = 0; i < res.length; i++) {
          //   const element = res[i];
          //   // console.log(element);
          //   if (element.dadosColetados < 85) {
          //     this.statusMessageRam = "Normal"
          //   } else {
          //     this.statusMessageRam = "Perigo"
          //     this.showAlertMessage = true;
          //     this.showComponent = "Memória RAM"
          //   }
          // }
          
          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);          
          
          if ( res[res.length-1].dadosColetados < 85) {
            this.statusMessageRam = "Normal"
          } else {
            this.statusMessageRam = "Perigo"
            this.showAlertMessage = true;
            this.showComponent = "Sua Ram está com o uso acima do esperado";
          }

          this.chart = new Chart('canvasRAM', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: '% em Uso de Memória RAM',
                  data: dado,
                  borderColor: function (dado) {
                    return dado.dataset.data[dado.dataset.data.length - 1] < 40 ? '#4F4F4F'
                      : dado.dataset.data[dado.dataset.data.length - 1] < 85 ? '#64bd36'
                      : '#ff2020'
                  },
                  fill: false
                }, {
                  label: 'Perigo',
                  data: [85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85],
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
                    maxTicksLimit: 10,
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

      this.service.getRegistroPlacaList(this.maquinasList[0].idMaquina)
        .subscribe(res => {
          
          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);

          if ( res[res.length-1].dadosColetados < 90) {
            this.statusMessagePlaca = "Normal"
          } else {
            this.statusMessagePlaca = "Perigo"
            this.showAlertMessage = true;
            this.showComponent = "Sua Placa de vídeo está com o uso acima do esperado";
          }
  
          this.chart = new Chart('canvasGPU', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: 'Temperatura da Placa de Vídeo',
                  data: dado,
                  borderColor: function(dado) {
                    return dado.dataset.data[dado.dataset.data.length-1] < 40 ? '#4F4F4F'                        
                      : dado.dataset.data[dado.dataset.data.length-1] < 80 ? '#64bd36'
                      : '#ff2020'                    
                },
                  fill: false
                }, {
                  label: 'Perigo',
                  data: [80,80,80,80,80,80,80,80,80,80],
                  borderColor: '#ff2020',
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
  
        this.service.getRegistroCpuList(this.maquinasList[0].idMaquina)
        .subscribe(res => {
          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);
          
          if ( res[res.length-1].dadosColetados < 90) {
            this.statusMessageCpu = "Normal"
          } else {
            this.statusMessageCpu = "Perigo"
            this.showAlertMessage = true;
            this.showComponent = "Sua CPU está com o uso acima do esperado";
          }
          this.chart = new Chart('canvasProcessador', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: '% em Uso do Processador ',
                  data: dado,
                  borderColor: function(dado) {
                    return dado.dataset.data[dado.dataset.data.length-1] < 40 ? '#4F4F4F'                        
                      : dado.dataset.data[dado.dataset.data.length-1] < 90 ? '#64bd36'
                      : '#ff2020'                    
                },
                  fill: false
                }, {
                  label: 'Perigo',
                  data: [90,90,90,90,90,90,90,90,90,90],
                  borderColor: '#ff2020',
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
                    return valor < 20 ? '#4F4F4F'
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

        
        this.service.getRegistroDisco2List(this.maquinasList[0].idMaquina)
        .subscribe(disco2 => {          
          this.discoDois = disco2.map(disco2 => disco2.dadosColetados);
        });

        this.service.getRegistroDiscoList(this.maquinasList[0].idMaquina)
        .subscribe(res => {

          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);
  
          this.chart = new Chart('canvasDisco', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: '% em Uso do Disco 1',
                  data: dado,
                  borderColor: '#64bd36',
                  fill: false                            
                }, {
                  label: '% em Uso do Disco 2',
                  data: this.discoDois,
                  borderColor: '#022cc22',
                  fill: false  
                }
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
                    labelString: 'Uso',
                    fontSize: 18
                  },
                  ticks: {
                    callback: function(data) {
                      return data  + '%';
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

        

    }, 3000);

    this.interval = setInterval(() => {
      this.service.getRegistroRamList(2)
        .subscribe(res => {

          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);
          
          if ( res[res.length-1].dadosColetados < 90) {
            this.statusMessageRam2 = "Normal"
          } else {
            this.statusMessageRam2 = "Perigo"
            this.showAlertMessage2 = true;
            this.showComponent2 = "Sua Ram está com o uso acima do esperado";
          }

          this.chart = new Chart('canvasRAM2', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: '% em Uso de Memória RAM',
                  data: dado,
                  borderColor: function (dado) {
                    return dado.dataset.data[dado.dataset.data.length - 1] < 40 ? '#4F4F4F'
                      : dado.dataset.data[dado.dataset.data.length - 1] < 85 ? '#64bd36'
                      : '#ff2020'
                  },
                  fill: false
                }, {
                  label: 'Perigo',
                  data: [85,85,85,85,85,85,85,85,85,85,85,85,85,85,85,85],
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
                    maxTicksLimit: 10,
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

      this.service.getRegistroPlacaList(2)
        .subscribe(res => { 
          
          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);

          if ( res[res.length-1].dadosColetados < 90) {
            this.statusMessagePlaca2 = "Normal"
          } else {
            this.statusMessagePlaca2 = "Perigo"
            this.showAlertMessage2 = true;
            this.showComponent2 = "Sua Placa de Vídeo está com o uso acima do esperado";
          }
  
          this.chart = new Chart('canvasGPU2', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: 'Temperatura da Placa de Vídeo',
                  data: dado,
                  borderColor: function(dado) {
                    return dado.dataset.data[dado.dataset.data.length-1] < 40 ? '#4F4F4F'                        
                      : dado.dataset.data[dado.dataset.data.length-1] < 80 ? '#64bd36'
                      : '#ff2020'                    
                },
                  fill: false
                }, {
                  label: 'Perigo',
                  data: [80,80,80,80,80,80,80,80,80,80],
                  borderColor: '#ff2020',
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
  
        this.service.getRegistroCpuList(2)
        .subscribe(res => {  
                    
          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);

          if ( res[res.length-1].dadosColetados < 90) {
            this.statusMessageCpu2 = "Normal"
          } else {
            this.statusMessageCpu2 = "Perigo"
            this.showAlertMessage2 = true;
            this.showComponent2 = "Sua CPU está com o uso acima do esperado";
          }
  
          this.chart = new Chart('canvasProcessador2', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: '% em Uso do Processador ',
                  data: dado,
                  borderColor: function(dado) {
                    return dado.dataset.data[dado.dataset.data.length-1] < 40 ? '#4F4F4F'                        
                      : dado.dataset.data[dado.dataset.data.length-1] < 90 ? '#64bd36'
                      : '#ff2020'                    
                },
                  fill: false
                }, {
                  label: 'Perigo',
                  data: [90,90,90,90,90,90,90,90,90,90],
                  borderColor: '#ff2020',
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
                    return valor < 20 ? '#4F4F4F'
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

        this.service.getRegistroDisco2List(2)
        .subscribe(disco2 => {          
          this.discoDois = disco2.map(disco2 => disco2.dadosColetados);
        });

        this.service.getRegistroDiscoList(2)
        .subscribe(res => {

          let hora = res.map(res => res.data.split(" ")[1]);
          let dado = res.map(res => res.dadosColetados);
  
          this.chart = new Chart('canvasDisco', {
            type: 'line',
            data: {
              labels: hora,
              datasets: [
                {
                  label: '% em Uso do Disco 1',
                  data: dado,
                  borderColor: '#64bd36',
                  fill: false                            
                }, {
                  label: '% em Uso do Disco 2',
                  data: this.discoDois,
                  borderColor: '#022cc22',
                  fill: false  
                }
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
                    labelString: 'Uso',
                    fontSize: 18
                  },
                  ticks: {
                    callback: function(data) {
                      return data  + '%';
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
        
    }, 5000);

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  
}

