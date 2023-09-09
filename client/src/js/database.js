import { openDB } from "idb";
import { header } from "./header";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB("jate", 1);
  const text = indexedDB.transaction("jate", "readwrite");
  const store = text.objectStore("jate");
  await store.put({ content });
  await text.done;

  console.log("content added to database");
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB("jate", 1);
  const txt = db.transaction('jate', "readonly");
  const store = txt.objectStore('jate')
  const request = store.getAll();
  console.log("All text from database retrieved", request);
  return allText;
};

initdb();
