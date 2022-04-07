function isEqual(str) {
    //fxn to check if start and end are equal
    let stringLength = str.length;
    return (str.charAt(0) == str.charAt(stringLength - 1));
}


function findEqual(str){
    let inputLength = str.length;
    let result = 0;

    //Starting point of input string
    for (var i = 0; i < inputLength; i++) {

        //starting point of findingSubstring
        for (var len = 1; len <= inputLength - i; len++){

            //check equality using equal fxn
            if (isEqual(str.substring (i, i + len))){
                result++;
                str.replace(str.substring (i, i + len), "");
                console.log(str)
            }

        }

        return result
    }
}

let text = "abcdabcdabcd";
this.findEqual(text);

            
        