import { Divider, List, ListItem } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import QrCodeIcon from "@mui/icons-material/QrCode";

const Instructions = () => {
  const listItemStyle = { marginRight: "1rem" };

  return (
    <div>
      <h3>CREATE A QR CODE THAT WILL NOTIFY YOUR PHONE WHEN SCANNED</h3>
      <p>IT&apos;S AS EASY AS..</p>
      <List sx={{ backgroundColor: "#332F37", borderRadius: "10px" }}>
        <ListItem>
          <CreateIcon sx={listItemStyle} /> FILL OUT FORM TO CREATE QR CODE
        </ListItem>
        <Divider />
        <ListItem>
          <SmartphoneIcon sx={listItemStyle} />
          ACTIVATE YOUR QR CODE VIA TEXT MESSAGE SENT TO PHONE NUMBER
        </ListItem>
        <Divider />
        <ListItem>
          <QrCodeIcon sx={listItemStyle} />
          POST/PASTE/PIN YOUR QR CODE WHEREVER YOU USERS TO BE ABLE TO SCAN IT!
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};

export default Instructions;
