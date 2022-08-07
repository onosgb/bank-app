import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  /* Sign in */
  async signIn(email: string, password: string) {
    return this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        const userRes = JSON.stringify(res.user);
        localStorage.setItem('auth', userRes);
        this.router.navigateByUrl('/dashboard');
      });
  }

  signOut() {
    this.angularFireAuth
      .signOut()
      .then(() => {
        this.router.navigateByUrl('/login');
        localStorage.clear();
      })
      .catch((err) => {
        console.log('Sign out gone wrong', err.message);
      });
  }

  async createUserWithEmailAndPassword(userData: Auth | any) {
    const auth = await this.angularFireAuth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );

    if (!auth.user) return;
    const displayName: string = userData.firstName ? '' : userData.firstName;
    await auth.user.updateProfile({ displayName });
    const userRef = this.firestore.doc(`users/${auth.user.uid}`);

    userRef.get().subscribe((data) => {
      // if user does not exist create the  new user
      if (!data.exists) {
        const createAt = new Date();
        const { password, confirmPassword, ...otherProps } = userData;
        delete userData.password;
        delete userData.confirmPassword;
        try {
          userRef.set({
            displayName: userData.firstName,
            createAt,
            ...otherProps,
            userId: auth.user?.uid,
          });
          this.signIn(userData.email, password).finally();
        } catch ({ e }) {
          console.error('error creating user: ' + e);
        }
      }
    });
  }

  async isSignedIn() {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.angularFireAuth.onAuthStateChanged(
        (userAuth) => {
          unsubscribe;
          resolve(userAuth);
        },
        reject
      );
    });
  }

  getUser() {
    const user = localStorage.getItem('auth');
    return user ? JSON.parse(user) : undefined;
  }

  getUserAccount(uid: string | undefined) {
    const userRef = this.firestore.doc<User>(`users/${uid}`);

    return userRef.valueChanges().pipe();
  }

  getUsers() {
    return this.firestore.collection<User>('users').valueChanges();
  }
}
