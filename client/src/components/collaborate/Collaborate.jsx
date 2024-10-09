import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import React, { useState } from 'react'
import UseValidation from '../../helpers/hooks/UseValidation';
import Recaptcha from '../../helpers/components/Recaptcha';
import axiosClient from '../../config/Axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import TableColaborates from './TableColaborates';
import Conditions from '../../helpers/components/Conditions';

const Collaborate = () => {

  const login = useSelector((state) => state.user.login)
  const role = useSelector((state) => state.user.role)

  const { capitalizeFirstLetter, maxLength, minLength, isCellPhone } = UseValidation();

  const [name, setName] = useState('');
  const [siteWeb, setSiteWeb] = useState('');
  const [facebook, setFacebook] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [corporatePurpose, setCorporatePurpose] = useState('');
  const [recaptchaIsValid, setRecaptchaIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [conditios, setConditios] = useState(false);

  const isDisable = () => {
    return (
      !name ||
      !minLength(name, 10) ||
      !email ||
      !minLength(email, 10) ||
      !contactNumber ||
      !minLength(contactNumber, 10) ||
      !corporatePurpose ||
      !minLength(corporatePurpose, 30)
    );
  }

  const resetForm = () => {
    setName('');
    setSiteWeb('');
    setFacebook('');
    setEmail('');
    setContactNumber('');
    setCorporatePurpose('');
    setConditios(false);
  }

  const handleSubmit = async (e) => {
    setIsLoading(true);
    const colaborate = {
      name,
      siteWeb,
      facebook,
      email,
      contactNumber,
      corporatePurpose
    }
    try {
      const res = await axiosClient.post('/colaborate', colaborate);
      const messageResponse = res.data.message
      Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: messageResponse,
      });
      setIsLoading(false);
      resetForm();
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response.data.message
      Swal.fire({
        icon: "error",
        text: errorMessage,
      });

    }

  }

  return (
    <>
      {login && role === "ADMIN" ? (
        <TableColaborates />
      ) : (
        <Container>
          <Grid container spacing={2} justifyContent='space-around' mt={5}>
            <Grid item xs={12} md={4}>
              <Alert sx={{ fontSize: '1.3rem' }} severity="info" icon={<VolunteerActivismIcon fontSize='large' color='secondary' />}>
                Si desea ser un aliado de nuestro proyecto y apoyar de alguna forma a las víctimas del conflicto armado en Colombia, victimas por covid-19 y demas temas que se tratan en nuestra plataforma memoria oral, dejenos los datos de la organización a la cual pertenece o si es persona natural. Pronto nos pondremos en contácto.
              </Alert>
            </Grid>
            <Grid item xs={12} md={8} >
              <Grid>
                <Typography mb={3} fontWeight='bold'>Envío de solicitud de aliados</Typography>
                <form>
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField
                        label="Nombre de la organización o persona natural"
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
                        type='number'
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
                        label="Objeto social (ej. cual es el motivo de su solicitud.)"
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
                          (!minLength(corporatePurpose, 30) && corporatePurpose)
                            ? "Este campo debe tener al menos 30 caracteres"
                            : (!maxLength(corporatePurpose, 200) && corporatePurpose)
                              ? "Este campo no puede ser mayor a 200 caracteres"
                              : ""
                        }
                        FormHelperTextProps={{ sx: { color: "error.main" } }}
                      />
                    </Grid>
                  </Grid>
                  <Grid >
                    <FormControlLabel
                      value="end"
                      control={<Checkbox color='secondary' checked={conditios} onChange={(e) => setConditios(e.target.checked)} />}
                      labelPlacement="end"
                    />
                    <Button
                      color='grayDark'
                      onClick={(e) => { setOpen(true) }}
                      size="small">
                      Terminos y condiciones
                    </Button>
                    <Conditions open={open} setOpen={setOpen} />
                  </Grid>
                  <Grid mt={2}>
                    <Recaptcha onChange={() => setRecaptchaIsValid(!recaptchaIsValid)} />
                  </Grid>
                  <Grid item xs={12} mt={3}>
                    <Button variant='contained' onClick={(e) => handleSubmit()} disabled={!recaptchaIsValid || !conditios || isDisable()}>Enviar</Button>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default Collaborate