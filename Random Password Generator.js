// Grab DOM elements
const lengthInput = document.getElementById('length');
const genBtn = document.getElementById('genBtn');
const copyBtn = document.getElementById('copyBtn');
const resultText = document.getElementById('result');

// Character sets for password generation
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
const allChars = uppercase + lowercase + numbers + symbols;

// Function to generate random password
function generatePassword() {
  let length = parseInt(lengthInput.value);
  
  // Guardrails for length input
  if (isNaN(length) || length < 4) length = 4;
  if (length > 64) length = 64;
  lengthInput.value = length;

  let password = '';
  
  // Ensure at least one character from each set is included for strength
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest of the password length randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password strings so the first 4 characters aren't predictable
  const shuffledPassword = password.split('').sort(() => 0.5 - Math.random()).join('');
  
  // Display the password
  resultText.textContent = shuffledPassword;

  // Trigger the popup animation
  resultText.classList.remove('pop');
  void resultText.offsetWidth; // Trigger a DOM reflow to restart animation
  resultText.add('pop');
  
  // Reset copy button state if it was copied previously
  copyBtn.classList.remove('copied');
  copyBtn.textContent = 'Copy';
}

// Function to copy text to clipboard
async function copyToClipboard() {
  const textToCopy = resultText.textContent;
  
  // Prevent copying default state message
  if (!textToCopy || textToCopy === 'Click generate to start') return;

  try {
    await navigator.clipboard.writeText(textToCopy);
    
    // Use your CSS .copied class styling
    copyBtn.classList.add('copied');
    copyBtn.textContent = 'Copied!';
    
    // Revert the button text after 2 seconds
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyBtn.textContent = 'Copy';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

// Event Listeners
genBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

