import { Alert, Box, Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import React, { useState } from 'react'
import UseValidation from '../../helpers/hooks/UseValidation';
import Recaptcha from '../../helpers/components/Recaptcha';

const Collaborate = () => {

  const { capitalizeFirstLetter, maxLength, minLength, isCellPhone } = UseValidation();

  const [name, setName] = useState('');
  const [siteWeb, setSiteWeb] = useState('');
  const [facebook, setFacebook] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [corporatePurpose, setCorporatePurpose] = useState('');
  const [recaptchaIsValid, setRecaptchaIsValid] = useState(false)

  const isDisable = () => {
    return (
      !name ||
      !minLength(name, 10) ||
      !siteWeb ||
      !minLength(siteWeb, 10) ||
      !facebook ||
      !minLength(facebook, 10) ||
      !email ||
      !minLength(email, 10) ||
      !contactNumber ||
      !minLength(contactNumber, 10) ||
      !corporatePurpose ||
      !minLength(corporatePurpose, 30)
    );
  }

  const resetForm = ()=>{
    setName('');
    setSiteWeb('');
    setFacebook('');
    setEmail('');
    setContactNumber('');
    setCorporatePurpose('');
  }

  const handleSubmit = () => {
    console.log('enviandi')
    resetForm();
  }

  return (
    <Container>
      <Alert severity="info" icon={<VolunteerActivismIcon fontSize='large' color='secondary' />}>
        Si desea ser un aliado nuestro y apoyar de alguna forma a las víctimas del conflicto armado en Colombia, victimas por covid-19 y demas temas que se tratan en nuestra plataforma memoria oral, dejenos los datos de la organización a la cual pertenece. Pronto nos pondremos en contácto.
      </Alert>
      <Grid container spacing={2} justifyContent='space-around' mt={5}>
        <Grid item xs={12} md={8} >
          <Grid>
            <Typography mb={3} fontWeight='bold'>Envío de solicitud de aliados</Typography>

            <form>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre de la organización"
                    color='grayDark'
                    variant="outlined"
                    name="name"
                    type='text'
                    required
                    value={name}
                    onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
                    fullWidth
                    inputProps={{ maxLength: 41 }}
                    helperText={
                      (!minLength(name, 10) && name)
                        ? "Este campo debe tener al menos 10 caracteres"
                        : (!maxLength(name, 40) && name)
                          ? "Este campo no puede ser mayor a 40 caracteres"
                          : ""
                    }
                    FormHelperTextProps={{ sx: { color: "error.main" } }}
                  />
                </Grid>
                <Grid item xs={12} md={6} mt={2}>
                  <TextField
                    label="Sitio Web"
                    color='grayDark'
                    variant="outlined"
                    name="siteWeb"
                    type='text'
                    required
                    value={siteWeb}
                    onChange={(e) => setSiteWeb(e.target.value)}
                    fullWidth
                    inputProps={{ maxLength: 41 }}
                    helperText={
                      (!minLength(siteWeb, 10) && siteWeb)
                        ? "Este campo debe tener al menos 10 caracteres"
                        : (!maxLength(siteWeb, 40) && siteWeb)
                          ? "Este campo no puede ser mayor a 40 caracteres"
                          : ""
                    }
                    FormHelperTextProps={{ sx: { color: "error.main" } }}
                  />
                </Grid>
                <Grid item xs={12} md={6} mt={2}>
                  <TextField
                    label="Facebook"
                    color='grayDark'
                    variant="outlined"
                    name="facebook"
                    type='text'
                    required
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    fullWidth
                    inputProps={{ maxLength: 41 }}
                    helperText={
                      (!minLength(facebook, 10) && facebook)
                        ? "Este campo debe tener al menos 10 caracteres"
                        : (!maxLength(facebook, 40) && facebook)
                          ? "Este campo no puede ser mayor a 40 caracteres"
                          : ""
                    }
                    FormHelperTextProps={{ sx: { color: "error.main" } }}
                  />
                </Grid>
                <Grid item xs={12} md={6} mt={2}>
                  <TextField
                    label="Correo electronico"
                    color='grayDark'
                    variant="outlined"
                    name="email"
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    inputProps={{ maxLength: 41 }}
                    helperText={
                      (!minLength(email, 10) && email)
                        ? "Este campo debe tener al menos 10 caracteres"
                        : (!maxLength(email, 40) && email)
                          ? "Este campo no puede ser mayor a 40 caracteres"
                          : ""
                    }
                    FormHelperTextProps={{ sx: { color: "error.main" } }}
                  />
                </Grid>
                <Grid item xs={12} md={6} mt={2}>
                  <TextField
                    label="Celular"
                    color='grayDark'
                    type='text'
                    variant="outlined"
                    value={contactNumber}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 10);
                      setContactNumber(value)
                    }}
                    fullWidth
                    helperText={
                      !isCellPhone(contactNumber) && contactNumber
                        ? "Número de celular incorrecto"
                        : ""
                    }
                    FormHelperTextProps={{ sx: { color: "error.main" } }}
                    required
                  />
                </Grid>
                <Grid item xs={12} mt={3}>
                  <TextField
                    label="Objeto social"
                    color='grayDark'
                    variant="outlined"
                    multiline
                    rows={3}
                    name="corporatePurpose"
                    type='text'
                    required
                    value={corporatePurpose}
                    onChange={(e) => setCorporatePurpose(capitalizeFirstLetter(e.target.value))}
                    fullWidth
                    inputProps={{ maxLength: 201 }}
                    helperText={
                      (!minLength(corporatePurpose, 10) && corporatePurpose)
                        ? "Este campo debe tener al menos 10 caracteres"
                        : (!maxLength(corporatePurpose, 200) && corporatePurpose)
                          ? "Este campo no puede ser mayor a 200 caracteres"
                          : ""
                    }
                    FormHelperTextProps={{ sx: { color: "error.main" } }}
                  />
                </Grid>
              </Grid>
              <Grid mt={2}>
                <Recaptcha onChange={() => setRecaptchaIsValid(!recaptchaIsValid)} />
              </Grid>
              <Grid item xs={12} mt={3}>
                <Button variant='contained' onClick={(e) => handleSubmit()} disabled={!recaptchaIsValid || isDisable()}>Enviar</Button>
              </Grid>
            </form>

          </Grid>

        </Grid>
        <Grid item xs={12} md={4}>
          HOLA
        </Grid>
      </Grid>
    </Container>
  )
}

export default Collaborate