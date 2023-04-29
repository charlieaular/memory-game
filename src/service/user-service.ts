const USERNAME_KEY = "username"

export const getUsername = (): string | null => {
  const username = localStorage.getItem(USERNAME_KEY)
  return username
}

export const setUsername = (username: string): void => {
  localStorage.setItem(USERNAME_KEY, username)
}