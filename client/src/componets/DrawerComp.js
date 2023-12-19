import React, { useState } from 'react'
import{Divider, Drawer,IconButton,List, ListItemButton, ListItemIcon, ListItemText,}from "@mui/material"
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Link,  } from 'react-router-dom';
import { useNavigate,} from "react-router-dom"
import { useDispatch} from "react-redux";
import { authActions } from '../store';
import { styled } from '@mui/system';

const MiddleDivier = styled((props)=> (
    <Divider color='grey' variant='middle' {...props}/>
))``;

function DrawerComp() {
    const [openDrawer,setopenDrawer]= useState(false);
    const navigate = useNavigate()
    const dispath = useDispatch()
  return (
    <React.Fragment>
      <Drawer 
      open={openDrawer}
      onClose={()=> setopenDrawer(false)}
      >
        <List >
            <ListItemButton   onClick={()=> setopenDrawer(!openDrawer)}>
                <ListItemIcon>
                    <ListItemText sx={{color:"grey",marginTop:'37px',}} primary={"HOME"} onClick={()=> navigate("/")} />
                </ListItemIcon>
            </ListItemButton>
            <MiddleDivier/>
        </List>
        <List >
            <ListItemButton   onClick={()=> setopenDrawer(!openDrawer)}>
                <ListItemIcon>
                    <ListItemText sx={{color:"grey",}} primary={"ALL STORIES"} onClick={()=> navigate("/blogs")} />
                </ListItemIcon>
            </ListItemButton>
            <MiddleDivier/>
        </List>
        <List>
            <ListItemButton  onClick={()=> setopenDrawer(!openDrawer)}>
                <ListItemIcon>
                    <ListItemText sx={{color:"grey"}}  primary={"MY STORIES"} onClick={()=> navigate("myBlogs")} />
                </ListItemIcon>
            </ListItemButton>
            <MiddleDivier/>
        </List>
        <List>
            <ListItemButton  onClick={()=> setopenDrawer(!openDrawer)}>
                <ListItemIcon>
                    <ListItemText sx={{color:"grey"}} primary={"ADD STORIES"} onClick={()=> navigate("/blogs/add")} />
                </ListItemIcon>
            </ListItemButton>
            <MiddleDivier/>
        </List>
        <List>
            <ListItemButton onClick={()=> setopenDrawer(!openDrawer)}>
                <ListItemIcon>
                    <ListItemText sx={{color:"grey"}}  primary={"LOGIN"} onClick={()=> navigate("/auth")} />
                </ListItemIcon>
            </ListItemButton>
            <MiddleDivier/>
        </List>
        <List>
            <ListItemButton   LinkComponent={Link} to='/auth' onClick={()=> setopenDrawer(!openDrawer)} >
                <ListItemIcon>
                    <ListItemText sx={{color:"grey"}}  primary={"LOGOUT"} onClick={()=> dispath(authActions.logout())} />
                </ListItemIcon>
            </ListItemButton>
            <MiddleDivier/>
        </List>
      </Drawer>
      <IconButton  sx={{color:'white',marginLeft:'auto',}} onClick={()=> setopenDrawer(!openDrawer)} >
        < DragHandleIcon/>
      </IconButton>
    </React.Fragment>
  )
}

export default DrawerComp
