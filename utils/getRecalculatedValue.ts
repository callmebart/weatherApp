import { CELSIUS_UNIT } from "../consts/symbols"
import globalStore from "../store/GlobalSettings"

export default function getRecalculatedValue(item:any) {
  if(globalStore.unit === CELSIUS_UNIT){
    return Math.floor(item.main.temp_max);
  };
     
  return Math.floor(item.main.temp_max) * 9 / 5 + 32;
   
}