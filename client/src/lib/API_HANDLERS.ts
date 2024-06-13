// ! firebase handlers
// * note : the purpose of this file is to contain the api functions axios

import { storage } from "@/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";

export const uploadImage = async (imgInput: File) => {
  if (!imgInput) return null;
  let imgName: string = `products_imgs/${imgInput.name + v4()}`;
  const imageRef = ref(storage, imgName);
  try {
    await uploadBytes(imageRef, imgInput);
    const downloadURL = await getDownloadURL(imageRef);
    return { imgName, downloadURL };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteImage = async (deleteRef) => {
  await deleteObject(deleteRef)
    .then(() => {
      console.log("img was deleted");
    })
    .catch((error) => {
      console.log(error);
    });
};
