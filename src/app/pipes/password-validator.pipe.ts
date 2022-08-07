import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'passwordValidator',
})
export class PasswordValidatorPipe implements PipeTransform {
  transform(password: string, confirmPassword: string) {
    return password !== confirmPassword;
  }
}
