export function formatPhoneNumber(phoneNumber){
    return phoneNumber.Number?("("+phoneNumber.Number.substring(0,3)+")"+" "+phoneNumber.Number.substring(3,6)+"-"+phoneNumber.Number.substring(6,10)+" "+(phoneNumber.ExtensionNumber ? ("(ext.) "+phoneNumber.ExtensionNumber):"")):"";    
}