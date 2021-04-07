import { Component, OnInit, ViewChild } from '@angular/core';
import{ Chart} from 'chart.js'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  @ViewChild('lineChart') lineChart;
  @ViewChild ('barChart') barChart;



  bars: any;
  colorArray: any;
  constructor() { }

  ionViewDidEnter() {
    this.createlineChart();
    this.barChart();
  }

  createlineChart() {
    this.bars = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Ingresos'],
        datasets: [{
          label: 'Pesos',
          data: [1500],
          backgroundColor: 'rgb(81, 209, 246)', // array should have same number of elements as number of dataset
         
        }]
      },
      
    });
  }

 
  createbarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ingresos'],
        datasets: [{
          label: 'Pesos',
          data: [1500],
          backgroundColor: 'rgb(81, 209, 246)', // array should have same number of elements as number of dataset
         
        }]
      },
      
    });
  }
}
