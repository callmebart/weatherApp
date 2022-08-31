import { 
    makeObservable,
    computed ,
    observable, 
    action
} from "mobx"
import { CELSIUS_UNIT } from "../consts/symbols"


class GlobalSettings {
   
    defaultUnit: string = CELSIUS_UNIT;

    constructor(){
        makeObservable(this,{
            defaultUnit:observable,
            changeUnit:action,
            unit:computed,
        })
    }

   changeUnit(unit:string){
    this.defaultUnit = unit
   }

    get unit() {
        return this.defaultUnit;
    }
}

const globalStore = new GlobalSettings()
export default globalStore;