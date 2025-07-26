
class DateUtils {
    static getDateAsInt(date){
       return date.getFullYear()*10000+(date.getMonth()+1)*100+date.getDate();
   }
   
   
   static getNextWeekkday(date){
     
       let add = 0;
       if(date.getDay()===5) add = 3;
       else if(date.getDay()===6) add = 2;
       else add = 1;
     
       return new Date(date.getFullYear(),date.getMonth(),date.getDate()+add);
   }
   
    static getNextWeekkdayAsInt(date){
     
       let add = 0;
       if(date.getDay()===5) add = 3;
       else if(date.getDay()===6) add = 2;
       else add = 1;
     
       return DateUtils.getDateAsInt(new Date(date.getFullYear(),date.getMonth(),date.getDate()+add));
   }
   
   static getYearAndMonth(integer){
       return Math.floor(integer/100);
   }

   static getNextDay(date){
     date.setDate(date.getDate()+1);
     return date;
   }
   }
   export default DateUtils;
   