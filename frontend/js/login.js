const handleLogin = () => {
  const userIdInput = document.getElementById('user-id');
  const passwordInput = document.getElementById('password');

  const userId = userIdInput.value;
  const password = passwordInput.value;

  const user = {
    userId: userId,
    password: password,
  };

  fetchUserInfo(user);
};

const fetchUserInfo = async (user) => {
  let data;
  try {
    const res = await fetch('http://localhost:5000/getUserInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    data = await res.json();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    console.log('user info', data);
  }
};
