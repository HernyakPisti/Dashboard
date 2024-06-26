import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  TextField, 
  FormControl
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useGetComputersQuery } from "state/api";
import Header from "components/Header";
import { useFormControl } from '@mui/material/FormControl';
import { Form } from "react-router-dom";
const Computer = ({ _id, name, user, anydesk, location,field, drivers }) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  if (!isEditing) {
    return (
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color={theme.palette.secondary[700]}
            gutterBottom
          >
            {location}
          </Typography>
          <Typography variant="h5" component={"div"}>
            {name}
          </Typography>
          <Typography
            sx={{ mb: "1.5rem" }}
            color={theme.palette.secondary[400]}
          >
            {user}
          </Typography>
          <Button
            variant="primary"
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(
                "C:\\Program Files (x86)\\AnyDesk\\AnyDesk.exe " + anydesk
              );
            }}
            sx={{
              border: "1px solid",
              borderColor: theme.palette.secondary[700],
            }}
          >
            <Typography>Anydesk</Typography>
          </Button>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See More
          </Button>
          <Button
            sx={{ align: "right" }}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            <EditIcon />
          </Button>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout={"auto"}
          unmountOnExit
          sx={{ color: theme.palette.neutral[300] }}
        >
          <CardContent>
            {/* <Typography>id: {_id}</Typography> */}
            <Typography>Drivers: {drivers}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <form>
      <CardContent> 
        <TextField 
        label="Location:"  
        defaultValue={location}
        required
        variant="outlined"
        sx={{mb:"0.75rem"}}
        />         
        
        <TextField 
        label="Name:"  
        defaultValue={name}
        required
        variant="outlined"
        sx={{mb:"0.75rem"}}
        />         
        <TextField 
        label="User:"  
        defaultValue={user}
        required
        variant="outlined"
        sx={{mb:"0.75rem"}}
        />      
        <TextField 
        label="Anydesk:"  
        defaultValue={anydesk}
        required
        variant="outlined"
        sx={{mb:"0.75rem"}}
        />      
        <TextField 
        label="Field:"  
        defaultValue={field}
        required
        variant="outlined"
        sx={{mb:"0.75rem"}}
        />      
        <TextField 
        label="Drivers:"  
        defaultValue={drivers}
        variant="outlined"
        sx={{mb:"0.75rem"}}
        focused
        />            
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            setIsEditing(!isEditing);
          }}
        >
          Cancel
        </Button>
        <Button variant="outlined" color="success" type="submit" >
          Save
        </Button>
      </CardActions>         
      </form>
    </Card>
  );
};

const Computers = () => {
  const { data, isLoading } = useGetComputersQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="COMPUTERS" subtitle="See your list of computers" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display={"grid"}
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent={"space-between"}
          rowGap={"20px"}
          columnGap={"1.33%"}
          sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
        >
          {data.map(({ _id, name, user, anydesk, location,field, drivers }) => (
            <Computer
              key={_id}
              _id={_id}
              name={name}
              user={user}
              anydesk={anydesk}
              location={location}
              drivers={drivers}
              field={field}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Computers;
