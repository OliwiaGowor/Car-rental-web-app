import { redirect } from 'react-router-dom';

export function action() {
  //localStorage.removeItem('token');
  //localStorage.removeItem('expiration');
  fetch('/logout')
  localStorage.removeItem('ifLogged');
  return redirect('/Car-rental-web-app');
}
