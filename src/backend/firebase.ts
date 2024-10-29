// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, collection, getDocs, QuerySnapshot, DocumentData, doc, updateDoc} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig: Record<string, string> = {
  apiKey: "AIzaSyAvXYf15ECUoKVFxZnlib7-e-2SwUnefB8",
  authDomain: "halloween-angular.firebaseapp.com",
  projectId: "halloween-angular",
  storageBucket: "halloween-angular.appspot.com",
  messagingSenderId: "426451397937",
  appId: "1:426451397937:web:5937fac8df99e5260c5410"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

const getData = async (): Promise<any[]> => {
    try {
        const houses: any[] = []; // Initialize the array to store document data
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "houses"));
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            //console.log(`Document ID: ${doc.id}`, doc.data());
            houses.push({ id: doc.id, ...doc.data() }); // Push each document's data into the array
            if (data && data['name']) {
                //console.log(data['name']);
            } else {
                console.log(`Document ${doc.id} does not have a 'name' property.`);
            }
        });
        
        
        return houses; // Return the array with all documents
    } catch (error) {
        console.error("Error fetching data: ", error);
        return []; // Return an empty array in case of an error
    }
};

const setData = async (houseName: string, rating: string): Promise<void> => {
    try {
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, "houses"));
        let houseDocId: string | null = null;
    
        querySnapshot.forEach((doc) => {
          if (doc.data()['name'] === houseName) {
            houseDocId = doc.id;
          }
        });
    
        if (houseDocId) {
          const houseDocRef = doc(db, "houses", houseDocId);
          await updateDoc(houseDocRef, { rating });
          console.log(`Rating for ${houseName} has been updated to ${rating}`);
        } else {
          console.error(`House with name ${houseName} not found.`);
        }
      } catch (error) {
        console.error("Error setting data: ", error);
    }
};
export { getData, setData };