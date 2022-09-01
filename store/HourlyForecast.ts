import { 
    makeObservable,
    computed ,
    observable, 
    action
} from "mobx"
class HourlyForecast {
   
    grouppedForecast:any = [];

    constructor(){
        makeObservable(this,{
            grouppedForecast: observable,
            setGrouppedData: action,
            grouppedForecastData: computed, 
        })
    }

    setGrouppedData(data:any){
        return this.grouppedForecast = data;
    }
    
    get grouppedForecastData(){
        return this.grouppedForecast;
    }
}

const hourlyForecast= new HourlyForecast();
export default hourlyForecast;