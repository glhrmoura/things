import { STORAGE_USER_ID_KEY } from '@/constants/users.js';

import { genID } from '@/utils';

const storage = {
  generateUserId() {
    const newUserId = genID();

    storage.setUserId(newUserId);

    return newUserId;
  },

  getUserId() {
    return localStorage.getItem(STORAGE_USER_ID_KEY);
  },

  setUserId(newUserId) {
    localStorage.setItem(STORAGE_USER_ID_KEY, newUserId);
  }
};

if (!storage.getUserId()) {
  storage.generateUserId();
}

export default storage;
