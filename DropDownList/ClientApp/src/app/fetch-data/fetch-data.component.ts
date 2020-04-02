import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public cacheForecasts: WeatherForecast[];
  public summaries: any[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
      this.cacheForecasts = this.forecasts;
    }, error => console.error(error));
    http.get<any[]>(baseUrl + 'weatherforecast/getSummaries').subscribe(result => {
      this.summaries = result;
    }, error => console.error(error));
  }

  filterForeCasts(filterVal: any) {
    if (filterVal == "0")
      this.forecasts = this.cacheForecasts;
    else
      this.forecasts = this.cacheForecasts.filter((item) => item.summary == filterVal);
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
