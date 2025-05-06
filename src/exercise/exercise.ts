function delayedRandomNumber(): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const number = Math.floor((Math.random() * 50.5)*2)
            resolve(number);
        }, 1000)
    });
};




function waitForClick(): Promise<void> {
    return new Promise((resolve) => {
        const button = document.getElementById("my-button");

        if (button) {
            button.addEventListener("click", () => {
            resolve();
        });
}
    })
  }

function findStringDivisors(str: string): string[] {
    let divisors: string[] = [];

    for (let divisorLength = 0; divisorLength < str.length; divisorLength++) {
        let numReps = str.length / divisorLength
        if (str.length % divisorLength != 0 ) {
            continue
        } else {
            const segments = Array.from({length: numReps}, (_, i) => 
                str.slice(i * divisorLength, (i + 1) * divisorLength));
            for (let i = 1; i < segments.length; i ++) {
                if (segments[i] != segments[i - 1]) {
                    continue
                } else {
                    divisors.push(segments[i])
                }
            }
        }  
    }
    return divisors
}

function isDivisor(subStr: string, largerStr: string): boolean {
    if (largerStr.length % subStr.length != 0) {
        return false
    }
    const numReps = largerStr.length/subStr.length
    return largerStr === subStr.repeat(numReps)
}


function gcdOfStrins(str1: string, str2: string): string {
    const shorterString = str1.length <= str2.length ? str1 : str2;
    const longerString = str1.length > str2.length ? str1 : str2;

    for (let i = shorterString.length; i >= 0; i--) {
        let candidate = shorterString.slice(0, i);
        if (isDivisor(candidate, longerString)) {
            return candidate
        }
    }
    return ""
  };


function gcdOfStrings(str1: string, str2: string): string {
    const repLength = gcd(str1.length, str2.length)
    const repString = str1.slice(0, repLength)

    if (str1 === repString.repeat(str1.length/repLength) &&
        str2 === repString.repeat(str2.length/repLength)) {
            return repString
        } else {
            return ""
        }  
}



function gcd(num1: number, num2: number): number {


    let remainder = num1 % num2
    // base case
    if (remainder == 0) {
        return num2 
    // recursive case
    } else {
        return gcd(num2, remainder)
    }



    // 24  and 56  start with 2 keep dividing both by multiples of 2 until one has a remainder. Keep a record of visited numbers.
    // go to 3 
    // generate a number line from 2 to the length of the smaller number.  if both numbers are divisible, enter it into divisors.  if one is
    // not divisible scratch out every multiple on the number line
    // when you're out of numbers on the number line, take the largest non scratched out number.  
    return 0
  }


function kidsWithCandies(kids: number[], extraCandies: number): boolean[] {

    const currMax = Math.max(...kids);
    return kids.map((el) => el + extraCandies >= currMax)

    }



function canPlaceFlowers(flowerbed: number[], n: number): boolean {

    function isAvail( index: number): boolean {
        if (flowerbed[index] !==0) return false;
        
        if (index === 0) {
            return flowerbed[index + 1] === 0;
        } else if (index === flowerbed.length - 1) {
            return flowerbed[index - 1] === 0;
        } else {
            return flowerbed[index + 1] === 0 && flowerbed[index - 1] === 0;
        }
    }

    for (let i = 0; i < flowerbed.length && n > 0; i++) {
        if (isAvail(i)) {
            flowerbed[i] = 1;
            n--;
        }
    }

    return n <= 0;
}

// const animalDict = animals.reduce<Record<number, string>>((acc, animal) => {
//     acc[animal.id] = animal.name;
//     return acc;
//   }, {});

function reverseVowels(s: string): string {

    const vowels = "aeiouAEIOU";

    let sArray = Array.from(s)

    const vowelPositions = sArray
        .map((letter, position): [number, string] =>([position, letter]))
        .filter(([_, letter])=> vowels.includes(letter))

        console.log(vowelPositions)

        for (let i = 0; i < vowelPositions.length/2; i++) {
            const [earlyPosition] = vowelPositions[i];
            const [latePosition] = vowelPositions[vowelPositions.length - i - 1]
            let earlyVowel = sArray[earlyPosition];
            sArray[i] = sArray[latePosition];
            sArray[latePosition] = earlyVowel;
        }

    return sArray.join("")
};

let a = reverseVowels("iceCream")