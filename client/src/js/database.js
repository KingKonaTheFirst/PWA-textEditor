import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const text = db.transaction('jate', "readwrite");
  const store = text.objectStore('jate');
  await store.put({ content });
  await text.done;

  console.log("content added to database");
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const allText = await db.getAll('jate');
  console.log('All text from database retrieved', allText);
  return allText;
}

initdb();
