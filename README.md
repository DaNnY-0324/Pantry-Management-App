# Pantry Management Application

This Pantry Management Application helps you efficiently manage your pantry items by allowing you to add, remove, search, and keep track of item quantities with the additional capability of capturing and storing item images.

## Features

- **Add Items**: Add new items with their quantities to the inventory.
- **Remove Items**: Remove items or decrease their quantities.
- **Search Functionality**: Search for specific items in the inventory.
- **Image Capture**: Capture and upload images of items using the device's camera.
- **Real-time Database**: All data is stored and managed using Firebase Firestore and Firebase Storage.

## Technologies Used

- **Frontend**: Next.js, Material UI
- **Backend**: Firebase Firestore, Firebase Storage
- **Image Capture**: react-webcam

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pantry-management-app.git
   cd pantry-management-app
   ```
2. Install the dependencies:

bash
Copy code
npm install

3. Set up Firebase:

Create a Firebase project in the Firebase Console.
Set up Firestore and Firebase Storage.
Obtain your Firebase configuration and add it to a firebase.js file in the root of your project:
javascript
Copy code
// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
apiKey: "your_api_key",
authDomain: "your_auth_domain",
projectId: "your_project_id",
storageBucket: "your_storage_bucket",
messagingSenderId: "your_messaging_sender_id",
appId: "your_app_id",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };

4. Running the Application
   Start the development server:

bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000.

Usage

Adding an Item

Click on the "Add Item" button.
Fill in the item name and quantity.
(Optional) Capture an image using the webcam.
Click "Add" to save the item to your inventory.

Searching for an Item

Use the search bar at the top of the page to search for items by name.
The inventory list will filter to show items that match the search term.

Running the Application
Start the development server:

bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000.

Usage

Adding an Item

Click on the "Add Item" button.
Fill in the item name and quantity.
(Optional) Capture an image using the webcam.
Click "Add" to save the item to your inventory.

Searching for an Item

Use the search bar at the top of the page to search for items by name.
The inventory list will filter to show items that match the search term.

Managing Item Quantities

Use the "Add" button next to an item to increase its quantity.
Use the "Remove" button next to an item to decrease its quantity.

Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
