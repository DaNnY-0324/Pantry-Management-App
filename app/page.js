"use client";
import { useState, useEffect, useRef } from "react";
import { firestore, storage } from "@/firebase";
import Webcam from "react-webcam";
import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import {
  collection,
  query,
  setDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1); // State to manage item quantity
  const [searchTerm, setSearchTerm] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const webcamRef = useRef(null);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, `inventory`));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item, quantity) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity: existingQuantity } = docSnap.data();
      await setDoc(docRef, { quantity: existingQuantity + quantity, imageUrl });
    } else {
      await setDoc(docRef, { quantity, imageUrl });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddItem = async () => {
    if (itemName && quantity > 0) {
      await addItem(itemName, quantity);
      setItemName("");
      setQuantity(1); // Reset quantity to 1 after adding
      handleClose();
    }
  };

  const capture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const storageRef = ref(storage, `inventory/${itemName}`);
      await uploadString(storageRef, imageSrc, "data_url");
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
    } else {
      console.error("Webcam not available");
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      p={2}
      bgcolor="#f0f0f0"
    >
      <Typography variant="h3" mb={2}>
        Pantry Inventory Management
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Search items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ maxWidth: 600, mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Item
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          borderRadius={2}
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%,-50%)",
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="column" spacing={2}>
            <TextField
              variant="outlined"
              label="Item Name"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Quantity"
              type="number"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
            />
            <Button variant="outlined" onClick={capture}>
              Capture Image
            </Button>
            <Button variant="outlined" onClick={handleAddItem}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box
        width="100%"
        maxWidth={800}
        border="1px solid #ccc"
        borderRadius={2}
        p={2}
        bgcolor="white"
      >
        <Typography variant="h5" color="#333" textAlign="center" mb={2}>
          Inventory Items
        </Typography>
        <Stack spacing={2} overflow="auto">
          {filteredInventory.map(({ name, quantity, imageUrl }) => (
            <Box
              key={name}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="#e0e0e0"
              padding={2}
              borderRadius={2}
            >
              <Box display="flex" alignItems="center" gap={2}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                )}
                <Typography variant="h6" color="#333">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
              </Box>
              <Typography variant="h6" color="#333">
                Quantity: {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => addItem(name, 1)}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeItem(name)}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
