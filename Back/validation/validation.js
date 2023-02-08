
function valid(input){
    if (typeof input ==  "number" || input == null || input==undefined){
        return false
    }
    if(typeof input== "string" && input.trim().length==0) return false

    return true
}

function regForName(input){
    let re =/^[\w- ]+$/
    return re.test(input)
}
function regForDate(input){
    let re = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
    return re.test(input)
}
const isValidISBN = function(ISBN){
    let re= /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
    
      return re.test(ISBN)
    
  }
module.exports= {valid, regForName,regForDate,isValidISBN} 