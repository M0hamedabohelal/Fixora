// Paymob Integration Service
// Note: In a real production environment, Step 1, 2, and 3 should be done in a backend server (e.g., Firebase Cloud Functions)
// to avoid exposing your PAYMOB_API_KEY to the frontend. For testing and demonstration purposes, we are implementing it here.

const PAYMOB_API_KEY = import.meta.env.VITE_PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID_CARD = import.meta.env.VITE_PAYMOB_INTEGRATION_ID_CARD || '123456'; 
const PAYMOB_INTEGRATION_ID_WALLET = import.meta.env.VITE_PAYMOB_INTEGRATION_ID_WALLET || '123457';
const PAYMOB_IFRAME_ID = import.meta.env.VITE_PAYMOB_IFRAME_ID || '12345';

// 1. Authentication Request
const authenticate = async () => {
  if (!PAYMOB_API_KEY) throw new Error("Paymob API Key is missing. Check .env file.");
  
  const response = await fetch('https://accept.paymob.com/api/auth/tokens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: PAYMOB_API_KEY })
  });
  const data = await response.json();
  return data.token;
};

// 2. Order Registration
const registerOrder = async (authToken, amountCents, items = []) => {
  const response = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: authToken,
      delivery_needed: "false",
      amount_cents: amountCents,
      currency: "EGP",
      items: items
    })
  });
  const data = await response.json();
  return data.id; // Order ID
};

// 3. Payment Key Generation
const generatePaymentKey = async (authToken, orderId, amountCents, billingData, integrationId) => {
  const response = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      auth_token: authToken,
      amount_cents: amountCents,
      expiration: 3600,
      order_id: orderId,
      billing_data: billingData,
      currency: "EGP",
      integration_id: integrationId
    })
  });
  const data = await response.json();
  return data.token; // Payment Token
};

// 4. Pay via Wallet (Vodafone Cash / Instapay)
const payWithWallet = async (paymentToken, mobileNumber) => {
  const response = await fetch('https://accept.paymob.com/api/acceptance/payments/pay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: {
        identifier: mobileNumber,
        subtype: "WALLET"
      },
      payment_token: paymentToken
    })
  });
  const data = await response.json();
  return data.redirect_url; // URL to redirect user to Vodafone/Instapay page
};

/**
 * Main function to initiate payment
 * @param {number} amount - Amount in EGP
 * @param {object} user - User object { firstName, lastName, email, phone }
 * @param {string} method - 'card', 'stc' (Vodafone Cash), 'apple' (Instapay)
 * @param {string} walletNumber - Mobile number for wallet payment
 * @returns {object} { type: 'iframe' | 'redirect', url: string }
 */
export const initiatePaymobPayment = async (amount, user, method, walletNumber = null) => {
  try {
    // If no API key is provided, we simulate the flow for UI testing
    if (!PAYMOB_API_KEY) {
      console.warn("No Paymob API Key found. Simulating payment flow...");
      return new Promise((resolve) => {
        setTimeout(() => {
          if (method === 'card') {
            resolve({ type: 'simulation', url: '#card-simulation' });
          } else {
            resolve({ type: 'simulation', url: '#wallet-simulation' });
          }
        }, 2000);
      });
    }

    const amountCents = amount * 100;
    const billingData = {
      apartment: "NA",
      email: user.email || "test@fixora.com",
      floor: "NA",
      first_name: user.firstName || "John",
      street: "NA",
      building: "NA",
      phone_number: user.phone || "+201000000000",
      shipping_method: "NA",
      postal_code: "NA",
      city: "Cairo",
      country: "EG",
      last_name: user.lastName || "Doe",
      state: "NA"
    };

    const authToken = await authenticate();
    const orderId = await registerOrder(authToken, amountCents, []);
    
    const integrationId = method === 'card' ? PAYMOB_INTEGRATION_ID_CARD : PAYMOB_INTEGRATION_ID_WALLET;
    const paymentKey = await generatePaymentKey(authToken, orderId, amountCents, billingData, integrationId);

    if (method === 'card') {
      // Return Iframe URL
      return {
        type: 'iframe',
        url: `https://accept.paymob.com/api/acceptance/iframes/${PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`
      };
    } else {
      // Return Redirect URL for Wallet (Vodafone Cash / Instapay)
      const redirectUrl = await payWithWallet(paymentKey, walletNumber || user.phone);
      return {
        type: 'redirect',
        url: redirectUrl
      };
    }
  } catch (error) {
    console.error("Paymob Error:", error);
    throw error;
  }
};
