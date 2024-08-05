"use client";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName] = useState("");

  const addItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, "pantry"), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { count } = docSnap.data();
        await updateDoc(docRef, { count: count + 1 });
      } else {
        // Add a new document with a unique ID
        await setDoc(doc(firestore, "pantry", item), { count: 1 });
      }
      // Update the pantry list after adding the item
      await updatePantry();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const removeItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, "pantry"), item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { count } = docSnap.data();
        if (count === 1) {
          // Delete document if count is 1
          await deleteDoc(doc(firestore, "pantry", item));
        } else {
          // Reduce count of document
          await updateDoc(docRef, { count: count - 1 });
        }
      }
      // Update the pantry list after adding the item
      await updatePantry();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={2}
    >
      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              bgcolor={"#ffffff"}
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Box border={"1px solid black"}>
        <Box height="100px" width="600px" bgcolor={"#ADD8E6"}>
          <Typography variant="h2" color={"#333"} textAlign={"center"}>
            Pantry Items
          </Typography>
        </Box>

        <Stack height="300px" width="600px" spacing={2} overflow={"auto"}>
          {pantry.map((item) => (
            <Box
              key={item.name}
              minHeight="100px"
              width="100%"
              display={"flex"}
              justifyContent={"space-around"}
              paddingX={5}
              alignItems={"center"}
              bgcolor={"#f0f0f0"}
            >
              <Typography variant="h4" color={"#333"} textAlign={"center"}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Typography>
              <Typography variant="h4" color={"#333"} textAlign={"center"}>
                {"x" + item.count}
              </Typography>
              <Button
                variant="contained"
                bgcolor={"#ffffff"}
                onClick={() => removeItem(item.name)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
