// Indian Currency Number to Words converter (e.g. 125400 -> "One Lakh Twenty Five Thousand Four Hundred Rupees Only")

const ones = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen"
];

const tens = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
];

function convertLessThanThousand(num) {
  let str = "";
  if (num >= 100) {
    str += ones[Math.floor(num / 100)] + " Hundred ";
    num %= 100;
  }
  if (num >= 20) {
    str += tens[Math.floor(num / 10)] + " ";
    num %= 10;
  }
  if (num > 0) {
    str += ones[num] + " ";
  }
  return str.trim();
}

export function numberToWordsINR(amount) {
  if (amount === 0 || !amount) return "Zero Rupees Only";

  const num = Math.floor(Math.abs(amount));
  const decimalPart = Math.round((Math.abs(amount) - num) * 100);

  let result = "";

  const crore = Math.floor(num / 10000000);
  let remainder = num % 10000000;

  const lakh = Math.floor(remainder / 100000);
  remainder = remainder % 100000;

  const thousand = Math.floor(remainder / 1000);
  remainder = remainder % 1000;

  const hundreds = remainder;

  if (crore > 0) {
    result += convertLessThanThousand(crore) + " Crore ";
  }
  if (lakh > 0) {
    result += convertLessThanThousand(lakh) + " Lakh ";
  }
  if (thousand > 0) {
    result += convertLessThanThousand(thousand) + " Thousand ";
  }
  if (hundreds > 0) {
    result += convertLessThanThousand(hundreds) + " ";
  }

  result = result.trim() + " Rupees";

  if (decimalPart > 0) {
    result += " and " + convertLessThanThousand(decimalPart) + " Paise";
  }

  return result + " Only";
}

export function formatINR(amount) {
  const val = Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(val);
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// Extract 2 digit state code from GSTIN or address
export function getStateCodeFromGST(gstin) {
  if (!gstin || gstin.length < 2) return "";
  return gstin.substring(0, 2);
}
