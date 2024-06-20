import { Button, Container, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axiosClient from '../../config/Axios'


const Users = () => {

  const getToken = useSelector((state)=>state.user.token)

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const config = {
          headers: {
            'Authorization': `Bearer${getToken}`
        }
        }
        const response = await axiosClient.get('/users?page=0&size=7', config);
        console.log(response)
      } catch (error) {
         console.log(error)
      }
    }
    fetchData();
  },[])
  
  return (
   <Container>
      <Grid container spacing={1} mb={6}>

      </Grid>
   </Container>
  )
}

export default Users