// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
const validateCred = array => {
  let checkDigit = array.pop();
  let newArray = [checkDigit];
  let finalArray = [];
  // double every other number, except the check digit which has been popped off
  for (let i = array.length-1; i >= 0; i-=2) {
    let double = array[i] * 2;
    newArray.push(double); 
  }
  // grab the rest of the numbers in the array
  for (let j = array.length-2; j >= 0; j-=2) {
    newArray.push(array[j]);
  }
  // find numbers greater than 9 and subtract 9 from its value, then push onto finalArray
  for (let k = 0; k < newArray.length; k++) {
    if (newArray[k] > 9) {
      let subNine = newArray[k] - 9;
      finalArray.push(subNine);
    } else {
      finalArray.push(newArray[k]);
    }
  }
  // add up all the numbers in the finalArray
  let sum = 0;
  for (let num = 0; num < finalArray.length; num++){
    sum += finalArray[num];
  }
  // return true if the sum / 10 has zero remainder else false
  if (sum % 10 === 0) {
    return true;
  } else {
    return false;
  }
};
// Let's test it!
//console.log(validateCred(valid1));

const findInvalidCards = array => {
  let invalidCards = [];
  for (let i = 0; i < array.length; i++) {
    if (validateCred(array[i]) === false) {
      invalidCards.push(array[i]);
    }
  }
  return invalidCards;
};
// Let's test it!
//console.log(findInvalidCards(batch));

const idInvalidCardCompanies = array => {
  let invalidCompanies = [];
  array.forEach((cardNum = []) => {
    let firstDigit = cardNum.shift();
    switch (firstDigit) {
      case 3:
      invalidCompanies.push('Amex');
      break;

      case 4:
      invalidCompanies.push('Visa');
      break;

      case 5:
      invalidCompanies.push('Mastercard');
      break;

      case 6:
      invalidCompanies.push('Discover');
      break;

      default:
      invalidCompanies.push('Company Not Found');
      break;
    }
  })
  // now let's get rid of the duplicates
  let filterIt = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  let filteredList = invalidCompanies.filter(filterIt);
  return filteredList;
}

console.log(idInvalidCardCompanies(findInvalidCards(batch)));