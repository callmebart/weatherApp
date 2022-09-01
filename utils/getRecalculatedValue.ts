import { CELSIUS_UNIT } from "../consts/symbols"
import globalStore from "../store/GlobalSettings"

export default function getRecalculatedValue(temp:number) {
  if(globalStore.unit === CELSIUS_UNIT){
    return Math.floor(temp);
  };
     
  return Math.floor(temp) * 9 / 5 + 32;
   
}