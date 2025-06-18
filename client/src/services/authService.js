import { authClient } from "../http/authClient";

function register({ name, email, password, phone }) {
  console.log('Sending registration data:', { name, email, password, phone });
  return authClient.post('/registration', {
    name,
    email,
    password,
    phone,
  });
}

function login({ email, password }) {
  return authClient.post('/login', { email, password });
}


function logout() {
    return authClient.post('/logout');
}

function activate(activationToken) {
    return authClient.get(`/activate/${activationToken}`);
}

function refresh() {
    return authClient.get('/refresh');
}

function reset({ email }) {
    return authClient.post('/reset', { email });
}

function changePassword({ newPassword, newPasswordConfirmation, resetToken }) {
    return authClient.post('/changePassword', {
        newPassword,
        newPasswordConfirmation,
        resetToken,
    });
}

function validateToken(resetToken) {
    return authClient.get(`/reset/${resetToken}`)
}

function updateInformation({ id, phone }) {
  return authClient.patch(`/users/${id}`, { phone });
}

function changeAuthPassword({
  id,
  email,
  oldPassword,
  newPassword,
  newPasswordConfirmation,
}) {
  return authClient.post("/changeAuthPassword", {
    id,
    email,
    oldPassword,
    newPassword,
    newPasswordConfirmation,
  });
}

function confirmChangeEmail(user) {
  return authClient.patch("/confirmChangeEmail", { user });
}

export const authService = {
  register,
  login,
  logout,
  activate,
  refresh,
  reset,
  changePassword,
  validateToken,
  updateInformation,
  changeAuthPassword,
  confirmChangeEmail,
};
