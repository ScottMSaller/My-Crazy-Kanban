import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    const token = data.token;

    localStorage.setItem('token', token);

    console.log('Login successful, token saved to local storage.');
    return token;

  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
}



export { login };
