const dns = require('node:dns');

// Extract domain from the email address
const extractEmailDomain = (email) => {
  return email.split('@')[1];
};

// Check if the domain has DNS records
const checkDomain = (domain) => {
  return new Promise((resolve) => {
    dns.resolve(domain, 'MX', (err, addresses) => {
      if (err) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

// Check email domain is valid or not
const isValidEmailDomain = async (email) => {
  const emailDomain = extractEmailDomain(email);
  return await checkDomain(emailDomain);
};

module.exports = { extractEmailDomain, checkDomain, isValidEmailDomain };
