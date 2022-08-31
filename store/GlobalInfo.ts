import { LocationObject } from "expo-location";
import { 
    makeObservable,
    computed ,
    observable, 
    flow
} from "mobx"
import { API_KEY, LANG, UNITS } from "../consts/openWeather";


class GlobalInfo {
   
    data:any = [];

    constructor(){
        makeObservable(this,{
            data: observable,
            fetchedData:computed,
            getDailyForecast: flow,
        })
    }

   getDailyForecast(currentLocation:LocationObject|null){
    const URL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + currentLocation?.coords.latitude + "&lon=" + currentLocation?.coords.longitude + "&appid=" + API_KEY + "&units=" + UNITS + "&lang=" + LANG;
    fetch(URL).then(res => res.json())
        .then((data) => {
            this.data = data;
        })
    };
    
    get fetchedData() {
        return this.data;
    }
}

const globalInfo= new GlobalInfo()
export default globalInfo;