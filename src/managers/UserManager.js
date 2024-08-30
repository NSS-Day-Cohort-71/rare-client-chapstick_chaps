export const getCurrentUser = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}`).then(res => res.json())
}