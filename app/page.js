import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const item = [
  "tomato",
  "potato",
  "onion",
  "garlic",
  "ginger",
  "chilli",
  "carrot",
];
export default function Home() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack height="200px" width="400px" spacing={2} overflow={"auto"}>
        {item.map((i) => (
          <Box
            key={i}
            height="100px"
            width="100%"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bgcolor={"#f0f0f0"}
          >
            <Typography
              variant="h4"
              color={"#333"}
              textAlign={"center"}
              fontWeight={"bold"}
            >
              {i}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
