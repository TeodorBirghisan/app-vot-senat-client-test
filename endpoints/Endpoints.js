const HOST = 'http://192.168.0.105:8080';

const apiLoginUser = `${HOST}/user/login-admin`;

async function postLogin(params) {
  try {
    let response = await fetch(apiLoginUser, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(params)
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
}

export { postLogin };
