const doLogin = async (username, password) => {
  try {
    // Step 1: Make a GET request to retrieve user data
    const response = await fetch('http://localhost:3004/users');
    const userData = await response.json();


    const user = await userData.find((user) => user.id === username && user.password === password);

    console.log(user);

    if (user === undefined)
      return false;

    return !!user;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default doLogin;