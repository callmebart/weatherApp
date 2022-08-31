export default function getDayName(date:string, index:number)
{
   const newDate = new Date(date.slice(0, 10)).toDateString(); 
   return index === 0 && "Today" || index === 1 && "Tomorrow" || newDate.slice(0,3);
}