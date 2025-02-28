// Eventually will set up storage
import { getStorage } from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

// Ensure default export exists
export default storage;

export { storage };
