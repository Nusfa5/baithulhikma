// Dummy login service

export async function loginUser(username, role) {
    if (username && role) {
      return 'dummy-jwt-token';
    }
    return null;
  }
  