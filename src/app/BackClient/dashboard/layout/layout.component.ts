import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FactureService } from 'src/app/Services/facture.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { ReviewsService } from 'src/app/Services/reviews.service';
Chart.register(...registerables);

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  Chiffre: number;
  Chiffre2: number;
  Chiffre3: number;
  myChart: any;

  rev1: Number;
  rev2: Number;

  rev3: Number;

  rev4: Number;

  rev5: Number;

  WeatherData: any;
  constructor(
    private us: FactureService,
    private elementRef: ElementRef,
    private Revservice: ReviewsService
  ) {}

  ngOnInit(): void {
    this.WeatherData = {
      main: {},
      isDay: true,
    };
    this.getWeatherData();

    this.getNbFactureLastMonth();
    this.getChiffreaffaireLastMonth();
    this.getChiffreaffairetoday();

    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);

    this.Revservice.getReviews1().subscribe((res) => {
      this.rev1 = res;

      this.Revservice.getReviews2().subscribe((res) => {
        this.rev2 = res;

        this.Revservice.getReviews3().subscribe((res) => {
          this.rev3 = res;

          this.Revservice.getReviews4().subscribe((res) => {
            this.rev4 = res;

            this.Revservice.getReviews5().subscribe((res) => {
              this.rev5 = res;

              const myChart = new Chart(htmlRef, {
                type: 'bar',
                data: {
                  labels: [
                    'Review 1',
                    'Review 2',
                    'Review 3',
                    'Review 4',
                    'Review 5',
                  ],
                  datasets: [
                    {
                      label: 'People Reviews',
                      data: [
                        this.rev1,
                        this.rev2,
                        this.rev3,
                        this.rev4,
                        this.rev5,
                      ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                },
              });
            });
          });
        });
      });
    });
  }

  getWeatherData() {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=tunis&appid=8103ef8bd12cd81cf492492ed5d2c311'
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeatherData(data);
      });

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }

  setWeatherData(data) {
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = currentDate.getTime() < sunsetTime.getTime();
    this.WeatherData.temp_celcius = (
      this.WeatherData.main.temp - 273.15
    ).toFixed(0);
    this.WeatherData.temp_min = (
      this.WeatherData.main.temp_min - 273.15
    ).toFixed(0);
    this.WeatherData.temp_max = (
      this.WeatherData.main.temp_max - 273.15
    ).toFixed(0);
    this.WeatherData.temp_feels_like = (
      this.WeatherData.main.feels_like - 273.15
    ).toFixed(0);
  }

  getNbFactureLastMonth() {
    this.us.getNbFactureLastMonth().subscribe((res) => {
      this.Chiffre = res;
    });
  }

  getChiffreaffaireLastMonth() {
    this.us.getChiffreaffaireLastMonth().subscribe((res) => {
      this.Chiffre2 = res;
    });
  }

  getChiffreaffairetoday() {
    this.us.getChiffreaffairetoday().subscribe((res) => {
      this.Chiffre3 = res;
    });
  }
}
