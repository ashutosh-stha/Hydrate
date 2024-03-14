import { WeatherData } from '../model/user/user';
import ApiService from './ApiService';

type WeatherRequestType = {
  lat: number;
  lon: number;
  exclude: string;
};

const API_KEY = 'b2f173c9d6ea72ea21364abd12336fb8';

class Weather {
  constructor(private apiService?: ApiService) {}

  async getCurrentLocationWeather({
    lat,
    lon,
    exclude,
  }: WeatherRequestType): Promise<WeatherData | undefined> {
    const path = `/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}&units=metric`;
    const response = await this.apiService?.get<WeatherData>(path, {});
    return response;
  }
}

export default Weather;
