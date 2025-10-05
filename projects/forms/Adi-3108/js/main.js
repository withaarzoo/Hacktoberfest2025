
let currentStep = 1;
const totalSteps = 3;


const wrapper = document.querySelector('.form-stages-wrapper');
const progressFill = document.querySelector('.progress-bar-fill');
const stepIndicators = document.querySelectorAll('.step-indicator');
const nextButtons = document.querySelectorAll('.btn-next');
const backButtons = document.querySelectorAll('.btn-back');
const submitButton = document.querySelector('.btn-submit');

// Form data storage
const formData = {};

// Validation functions
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateStep(step) {
    let isValid = true;
    
    if (step === 1) {
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        
        // Validate full name
        if (!fullName.value.trim()) {
            showError(fullName);
            isValid = false;
        } else {
            hideError(fullName);
            formData.fullName = fullName.value.trim();
        }
        
        // Validate email
        if (!email.value.trim() || !validateEmail(email.value)) {
            showError(email);
            isValid = false;
        } else {
            hideError(email);
            formData.email = email.value.trim();
        }
        
        // Validate phone
        if (!phone.value.trim()) {
            showError(phone);
            isValid = false;
        } else {
            hideError(phone);
            formData.phone = phone.value.trim();
        }
    }
    
    if (step === 2) {
        const street = document.getElementById('street');
        const city = document.getElementById('city');
        const zipCode = document.getElementById('zipCode');
        
        // Validate street
        if (!street.value.trim()) {
            showError(street);
            isValid = false;
        } else {
            hideError(street);
            formData.street = street.value.trim();
        }
        
        // Validate city
        if (!city.value.trim()) {
            showError(city);
            isValid = false;
        } else {
            hideError(city);
            formData.city = city.value.trim();
        }
        
        // Validate ZIP code
        if (!zipCode.value.trim()) {
            showError(zipCode);
            isValid = false;
        } else {
            hideError(zipCode);
            formData.zipCode = zipCode.value.trim();
        }
    }
    
    return isValid;
}

function showError(input) {
    input.classList.add('error');
    const errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.classList.add('show');
    }
}

function hideError(input) {
    input.classList.remove('error');
    const errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.classList.remove('show');
    }
}

// Update step function
function updateStep(newStep) {
    
    if (newStep > currentStep && !validateStep(currentStep)) {
        return;
    }
    
   
    if (newStep === 3) {
        updateConfirmation();
    }
  
    currentStep = newStep;
    
   
    const translatePercent = (currentStep - 1) * 33.333;
    wrapper.style.transform = `translateX(-${translatePercent}%)`;
    
    
    const fillWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${fillWidth}%`;
    
    
    stepIndicators.forEach((indicator, index) => {
        const step = index + 1;
        indicator.classList.remove('active', 'completed');
        
        if (step < currentStep) {
            indicator.classList.add('completed');
        } else if (step === currentStep) {
            indicator.classList.add('active');
        }
    });
}

function updateConfirmation() {
    document.getElementById('confirmName').textContent = formData.fullName || '-';
    document.getElementById('confirmEmail').textContent = formData.email || '-';
    document.getElementById('confirmPhone').textContent = formData.phone || '-';
    document.getElementById('confirmStreet').textContent = formData.street || '-';
    document.getElementById('confirmCity').textContent = formData.city || '-';
    document.getElementById('confirmZip').textContent = formData.zipCode || '-';
}


nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const nextStep = parseInt(button.dataset.next);
        updateStep(nextStep);
    });
});

backButtons.forEach(button => {
    button.addEventListener('click', () => {
        const prevStep = parseInt(button.dataset.prev);
        updateStep(prevStep);
    });
});

submitButton.addEventListener('click', () => {
    alert('Form submitted successfully!\n\nData:\n' + JSON.stringify(formData, null, 2));
    console.log('Form Data:', formData);
});


document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        hideError(input);
    });
});