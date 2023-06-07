import {
  Othent,
  type LogInReturnProps,
  type useOthentReturnProps,
  type LogOutReturnProps
} from 'othent';
import { setUserData } from '@/lib/store';

let othent: useOthentReturnProps | undefined;

export { getUserData } from './store';

export async function getOthent(apiid: string) {
  if (othent) return othent;
  othent = await Othent({ API_ID: apiid });
  return othent;
}

export async function othentLogin(apiid: string): Promise<LogInReturnProps> {
  const othent = await getOthent(apiid);
  const loginResponse = await othent.logIn();
  setUserData(loginResponse);
  return loginResponse;
}

export async function othentLogout(apiid: string): Promise<LogOutReturnProps> {
  const othent = await getOthent(apiid);
  const logoutResponse = await othent.logOut();
  logoutResponse.response && setUserData(null);
  return logoutResponse;
}
