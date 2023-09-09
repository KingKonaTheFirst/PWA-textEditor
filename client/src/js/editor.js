// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from "./database";
import { header } from "./header";

export default class {
  constructor() {
    const localData = localStorage.getItem("content");

    // check if CodeMirror is loaded
    if (typeof CodeMirror === "undefined") {
      throw new Error("CodeMirror is not loaded");
    }

    this.editor = CodeMirror(document.querySelector("#main"), {
      value: "",
      mode: "javascript",
      theme: "monokai",
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info("Loaded data from IndexedDB:", data);
      
      if (typeof data === 'string') {
        this.editor.setValue(data);
      } else if (localData) {
        console.warn("Data from IndexedDB wasn't a string. Using localData.");
        this.editor.setValue(localData);
      } else {
        console.warn("Using header as default content.");
        this.editor.setValue(header);
      }
    }).catch(err => {
      console.error("Error fetching data from IndexedDB:", err);
      this.editor.setValue(header);  // Use header as a fallback in case of errors.
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on("blur", () => {
      console.log("The editor has lost focus");
      putDb(localStorage.getItem("content"));
    });
  }
}
