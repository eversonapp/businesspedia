export const formatingValues = (val) => {
    if(val === undefined || val === null || val === ''){
        return '' 
    }
    else{
        const valString = val.toString()
        if(valString.charAt(0) === '-'){
            if(valString.length >= 8 && valString.length <= 10){
                return new Intl.NumberFormat().format((val).toString().slice(0,-3)) + 'M'
            }
            else if(valString.length >= 11 && valString.length <= 13){
                return new Intl.NumberFormat().format((val).toString().slice(0,-6)) + 'B'
            }
            else if(valString.length >= 14 && valString.length <= 16){
                return new Intl.NumberFormat().format((val).toString().slice(0,-9)) + 'T'
            }
            else{
                return val
            }
        }
        else{
            if(valString.length >= 7 && valString.length <= 9){
                return new Intl.NumberFormat().format((val).toString().slice(0,-3)) + 'M'
            }
            else if(valString.length >= 10 && valString.length <= 12){
                return new Intl.NumberFormat().format((val).toString().slice(0,-6)) + 'B'
            }
            else if(valString.length >= 13 && valString.length <= 15){
                return new Intl.NumberFormat().format((val).toString().slice(0,-9)) + 'T'
            }
            else{
                return val
            }
        }
    }
}