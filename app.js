var dateInput = document.querySelector('#date-input');
var showBtn = document.querySelector('#show-btn');
var outputDiv = document.querySelector('#show-output');

function reverseStr(str) {

    var listOfChar = str.split('');
    var reversedListOfChar  = listOfChar.reverse();
    var reversedStr = reversedListOfChar.join('');
    
    return reversedStr;
    // return str.split('').reverse().join('');
  }

  function isPalindrome(str){
    var reverse = reverseStr(str);
    if(str == reverse){
        return true ;
    }
    return false;
  }

  function convertDateToStr(date){
    var dateStr = { day : '', month : '', year: ''};

    if(date.day <10){
        dateStr.day = "0" +date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month <10){
        dateStr.month = "0" +date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
  }


  function getAllDatesFormats(date){
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy , mmddyyyy, yyyymmdd, mmddyy, ddmmyy, yymmdd];
  }
  

  function checkPalindromeForAllDateFormats(date){

    var listOfPalindromes = getAllDatesFormats(date);
    var flag = false;
     
    for(let i= 0; i<listOfPalindromes.length; i++){
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }
    return flag;
  }

  function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }

    else if(year % 4 === 0){
        return true;
    }

    else if(year % 100 === 0){
        return false;
    }

    else 
    return false;
  }


  function getnextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
     if(month === 2){
    if(isLeapYear(year)){
        if(day > 29){
           day = 1;
           month++; 
        }
    }
        else {
            if(day > 28){
                day = 1; 
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }

    if(month >12){
        month = 1;
        year++;
    }

    return {
        day : day,
        month : month,
        year : year
    };
  }


   function checkNextPalindromeDate(date){
    var counter = 0;
    var nextDate = getnextDate(date);

    while(1){
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        nextDate = getnextDate(nextDate);
    }
     return [counter, nextDate];
   }

  var date = {
    day : 31,
    month : 12,
    year : 2020
  };
  
function clickHandler(e){

    var bdyStr = dateInput.value;
    if(bdyStr !== ''){
        var listOfDate = bdyStr.split('-');
        var date = {
            day : Number(listOfDate[2]),
            month : Number(listOfDate[1]),
            year : Number(listOfDate[0])
        };

        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){
            outputDiv.innerText = "Yay! your Birthday is Palindrome";
        }
        else{
            var [counter, nextDate] = checkNextPalindromeDate(date);
            outputDiv.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days`;
         }
    
    }

}
  showBtn.addEventListener('click', clickHandler);
  
