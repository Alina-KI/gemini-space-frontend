const SERVER_URL = 'http://localhost:5000/files/upload'
export const getFileUrl = (path: string) => `${SERVER_URL}/${path}`