(async () => {
  try {
    const fetch = global.fetch || (await import('node-fetch')).default;

    const loginResp = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'testuser@example.com', password: 'password123' }),
    });

    const loginJson = await loginResp.json();
    console.log('LOGIN_RESPONSE:', JSON.stringify(loginJson));

    const token = loginJson.token;
    if (!token) {
      console.error('No token returned; cannot place order');
      process.exit(1);
    }

    const orderResp = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ products: [{ _id: '6a4799b2d350bcdc6fe3f088', quantity: 1 }], totalAmount: 1999 }),
    });

    const orderJson = await orderResp.json();
    console.log('ORDER_RESPONSE:', JSON.stringify(orderJson));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();