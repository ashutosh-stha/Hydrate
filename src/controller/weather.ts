import ApiService from './ApiService';

type WeatherRequestType = {
  lat: number;
  lon: number;
  exclude: string;
};

const API_KEY = 'b2f173c9d6ea72ea21364abd12336fb8';

class Weather {
  constructor(private apiService?: ApiService) {}

  async getCurrentLocationWeather({ lat, lon, exclude }: WeatherRequestType) {
    const path = `/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_KEY}`;
    const response = await this.apiService?.get(path, {});
    return response;
  }
}

export default Weather;
