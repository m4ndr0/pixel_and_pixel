const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U",
    "V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u",
    "v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
];
    
    
export default function createRandomId(){
    let randomId = ""
    let randomIndexOne = Math.floor( Math.random() * characters.length )
    let randomIndexTwo = Math.floor( Math.random() * characters.length )
    let randomIndexThree = Math.floor( Math.random() * characters.length )
    let randomIndexFour = Math.floor( Math.random() * characters.length )
    let randomIndexFive = Math.floor( Math.random() * characters.length )
    let randomIndexSix = Math.floor( Math.random() * characters.length )
    let randomIndexSeven = Math.floor( Math.random() * characters.length )
    let randomIndexEight = Math.floor( Math.random() * characters.length )
    let randomIndexNine = Math.floor( Math.random() * characters.length )
    let randomIndexTen = Math.floor( Math.random() * characters.length )
    let randomIndexEleven = Math.floor( Math.random() * characters.length )
    let randomIndexTwelve = Math.floor( Math.random() * characters.length )
    let randomIndexThirteen = Math.floor( Math.random() * characters.length )
    let randomIndexFourteen = Math.floor( Math.random() * characters.length )
    let randomIndexFiftheen = Math.floor( Math.random() * characters.length )
    randomId = characters[randomIndexOne] + characters[randomIndexTwo] + characters[randomIndexThree] 
                    + characters[randomIndexFour] + characters[randomIndexFive] + characters[randomIndexSix] 
                    + characters[randomIndexSeven] + characters[randomIndexEight] + characters[randomIndexNine] 
                    + characters[randomIndexTen] + characters[randomIndexEleven] + characters[randomIndexTwelve] 
                    + characters[randomIndexThirteen] + characters[randomIndexFourteen] + characters[randomIndexFiftheen]
    return randomId
}