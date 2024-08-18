import { Alert, AlertTitle, Container } from '@mui/material'
import React from 'react'
import FormTestimony from './DataTestimomy/FormTestimony'
import { useSelector } from 'react-redux'

const UpdateTestimony = () => {

    const testimonyId = useSelector((state) => state.testimony.testimonyId)

    return (
        <Container sx={{ mt: 4 }}>
            <Alert sx={{ mb: 2 }} icon={false} severity="info"><AlertTitle>Edicion de testimonio.</AlertTitle></Alert>
            <FormTestimony action="update" testimonyId={testimonyId} />
        </Container>
    )
}

export default UpdateTestimony