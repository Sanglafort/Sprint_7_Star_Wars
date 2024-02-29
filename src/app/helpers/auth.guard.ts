
import { CanActivateFn } from "@angular/router";

export const authGuard: CanActivateFn = () => {

  if(localStorage.getItem('token')) {
    return true;
  } else {
    return false;
  }
}

