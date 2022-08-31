import { 
    makeObservable,
    computed ,
    observable, 
    action
} from "mobx"
class GlobalInfo {
   
    data:any = [];

    constructor(){
        makeObservable(this,{
            data: observable,
            fetchedData:computed,
            setDailyForecast: action,
        })
    }

    setDailyForecast(data:any){
        return this.data = data
    }
    
    get fetchedData() {
        return this.data;
    }
}

const globalInfo= new GlobalInfo()
export default globalInfo;