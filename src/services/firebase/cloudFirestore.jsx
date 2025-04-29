import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const addDocument = async (db, collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), { data });
    console.log("Document  ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};


export const readOrCreateDocument = async (
  db,
  collectionName,
  fieldName,
  fieldValue
) => {
  try {
    const colRef = collection(db, collectionName);
    const q = query(colRef, where(fieldName, "==", fieldValue));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return results;
    }

    console.log("No documents. Creating a new ");

    const newDocRef = doc(colRef);
    const [outerKey, innerKey] = fieldName.split(".");
    const documentData = {
      [outerKey]: {
        [innerKey]: fieldValue,
      },
    };

    console.log(documentData);

    await setDoc(newDocRef, documentData);

    const createdDoc = { id: newDocRef.id, ...documentData };
    console.log("Created document:", createdDoc);
    return [createdDoc];
  } catch (error) {
    console.error("Error in readOrCreateDocument:", error);
    throw error;
  }
};

export const updateDocument = async (
  db,
  collectionName,
  docId,
  updatedData
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
    console.log("Document updated successfully:", docId);
    return true;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};
