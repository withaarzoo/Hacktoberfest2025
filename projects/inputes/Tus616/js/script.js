(() => {
  const form = document.getElementById('signup-form');
  if (!form) return;

  const byId = (id) => document.getElementById(id);
  const fields = {
    fullName: byId('fullName'),
    email: byId('email'),
    password: byId('password'),
    confirmPassword: byId('confirmPassword'),
    terms: byId('terms')
  };
  const errors = {
    fullName: byId('fullName-error'),
    email: byId('email-error'),
    password: byId('password-error'),
    confirmPassword: byId('confirmPassword-error')
  };
  function setError(input, message) {
    if (!input) return;
    try{ input.setAttribute('aria-invalid', 'true'); }catch(e){}
    const err = errors && errors[input.id];
    if (err) err.textContent = message || '';
  }
  function clearError(input) {
    if (!input) return;
    try{ input.removeAttribute('aria-invalid'); }catch(e){}
    const err = errors && errors[input.id];
    if (err) err.textContent = '';
  }
  function validateFullName() {
    if (!fields.fullName) return true;
    const value = (fields.fullName.value || '').trim();
    if (value.length < 2) { 
        setError(fields.fullName, 'Please enter your full name.'); 
        return false;
     }
    clearError(fields.fullName);
     return true;
  }

  function validateEmail() {
    if (!fields.email) return true;
    const value = (fields.email.value || '').trim();
    const ok = /.+@.+\..+/.test(value);
    if (!ok) {
         setError(fields.email, 'Enter a valid email address.');
          return false;
        }
    clearError(fields.email);
     return true;
  }

  function validatePassword() {
    if (!fields.password) return true;
    const value = fields.password.value || '';
    if (value.length < 8) {
         setError(fields.password, 'Password must be at least 8 characters.');
          return false;
        }
    clearError(fields.password);
    return true;
  }

  function validateConfirmPassword() {
    if (!fields.confirmPassword || !fields.password) return true;
    if ((fields.confirmPassword.value || '') !== (fields.password.value || '')) {
      setError(fields.confirmPassword, 'Passwords do not match.'); 
      return false;
    }
    clearError(fields.confirmPassword); 
    return true;
  }

  function validateTerms() {
    if (!fields.terms) return true;
    if (!fields.terms.checked) { 
    try{ fields.terms.focus(); }catch(e){}; 
    return false; 
  }
    return true;
  }

  const validators = {
    fullName: validateFullName,
    email: validateEmail,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
  };

  Object.entries(validators).forEach(([id, fn]) => {
    const el = fields[id];
    if (!el) return;
    try{
      el.addEventListener('blur', fn);
      el.addEventListener('input', (e) => {
        if (el.getAttribute && el.getAttribute('aria-invalid') === 'true') fn(e);
      });
    }catch(e){  }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = [validateFullName(), validateEmail(), validatePassword(), validateConfirmPassword(), validateTerms()] 
      .every(Boolean);
    if (!ok) return;

    const data = {
      fullName: fields.fullName.value.trim(),
      email: fields.email.value.trim()
    };
    console.log('Form submitted', data);
    form.reset();
    alert('Account created successfully!');
  });
})();


