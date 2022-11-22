import firebaseApp from './config';
import storage from '@/services/storage';

class FirebaseDB extends EventTarget {
  constructor(database) {
    super();

    this._database = database;
    this._userId = storage.getUserId();
    this._userRef = database.ref(this._userId);

    const onStorageChange = () => {
      const currentUserId = storage.getUserId();

      if (currentUserId && this.userId === currentUserId) {
        return;
      }

      const newUserId = storage.generateUserId();
      this.userId = newUserId;
      this.userRef = newUserId;

      const userRefChangedEvent = new CustomEvent('user-ref-changed', {
        detail: {
          newUserRef: this.userRef
        }
      });

      this.dispatchEvent(userRefChangedEvent);
    };

    window.addEventListener('storage', onStorageChange);
  }

  get userId() {
    return this._userId;
  }

  set userId(newUserId) {
    this._userId = newUserId;
  }

  get userRef() {
    return this._userRef;
  }

  set userRef(userId) {
    if (this._userRef) this._userRef.remove();

    this._userRef = this._database.ref(userId);
  }
}

export default new FirebaseDB(firebaseApp.database());
