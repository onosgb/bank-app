import { PasswordValidatorPipe } from './password-validator.pipe';

describe('PasswordValidatorPipe', () => {
  it('create an instance', () => {
    const pipe = new PasswordValidatorPipe();
    expect(pipe).toBeTruthy();
  });
});
