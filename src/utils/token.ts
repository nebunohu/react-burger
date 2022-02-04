import { API_URL } from './url';

export const refreshToken = async ():Promise<boolean> => {
  try {
    const headers = new Headers({
      "content-type": 'application/json',

    });
    const body = {'token': localStorage.getItem('refreshToken')};
    const res = await fetch(`${API_URL}/auth/token`, { method: 'POST', mode: 'cors', headers, body: JSON.stringify(body) });

      const data = await res.json();
      if (data.success) {
        //setCookie('token', data.refreshToken, {'path': '/'});
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        return true;
      } else {
        throw new Error(data.message);
      }

    } catch( e ) {
      console.log( e );
      return false;
    }
}