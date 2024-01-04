import { getDatabase, ref, set, get, update } from "firebase/database";
import { firebase } from "../firebaseConfig";

export const db = getDatabase(firebase);

export const store = async (path, data) => {
  await set(ref(db, path), data);
};

export const retrieve = async (path) => {
  const snapshot = await get(ref(db, path));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
  }
};

export const updateDb = async (path, data) => {
  await update(ref(db, path), data);
};
