import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import crearUsuario from '../services/userservice';
import Swal from 'sweetalert2';


const FormularioRegistro = () => {

  const soloNumeros = (event) => {
    if (!/\d/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <Formik
        initialValues={{
          nombres: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          genero: '',
          telefono: '',
          correo: '',
        }}
        
        validationSchema={Yup.object({
          nombres: Yup.string()
            .required('Campo Requerido'),
          apellidoPaterno: Yup.string()
            .required('Campo Requerido'),
          apellidoMaterno: Yup.string()
            .required('Campo Requerido'),
          genero: Yup.string()
            .required('Campo Requerido'),
          telefono: Yup.string()
            .matches(
              /^(\+\d{1,3}[- ]?)?\d{10}$/,
              "Número de teléfono no válido"
            )
            .required('Campo Requerido'),
          correo: Yup.string()
            .email('Correo no válido')
            .required('Campo Requerido'),
        })}
        
        onSubmit={(datos, { setSubmitting, resetForm }) => {
            crearUsuario(datos)
            .then(response => {
              console.log(response.data);
              Swal.fire(
                'Guardado!',
                'El usuario ha sido guardado con exito.',
                'success'
              );
              resetForm();
            })
            .catch(error => {
              console.error(error);
              Swal.fire(
                'Error!',
                'Ha ocurrido un error al guardar el usuario.',
                'error'
              );
            })
            .finally(() => setSubmitting(false));
        }}
      >
        <Form className="container mt-3" autocomplete="off">
          <div className="mb-3 row">
            <div className="col-sm-12">
            <label htmlFor="nombres" className="col-sm-2 col-form-label">Nombres</label>
              <Field name="nombres" type="text" className="form-control" />
              <ErrorMessage name="nombres" component="div" className="text-danger" />
            </div>
          </div>

          <div className="mb-3 row">
            <div className='col'>
                <label htmlFor="apellidoPaterno" className="form-label">Apellido Paterno</label>
                <Field name="apellidoPaterno" type="text" className="form-control" />
                <ErrorMessage name="apellidoPaterno" component="div" className="text-danger" />
            </div>
            <div className='col'>
                <label htmlFor="apellidoMaterno" className="form-label">Apellido Materno</label>
                <Field name="apellidoMaterno" type="text" className="form-control" />
                <ErrorMessage name="apellidoMaterno" component="div" className="text-danger" />
            </div>
          </div>

          <div className="mb-3 row">
            <div className='col'>
                <label htmlFor="correo" className="form-label">Correo</label>
                <Field name="correo" type="text" className="form-control" />
                <ErrorMessage name="correo" component="div" className="text-danger" />
            </div>
            <div className='col'>
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <Field name="telefono" type="text" className="form-control" maxLength="10"  onKeyPress={soloNumeros}/>
                <ErrorMessage name="telefono" component="div" className="text-danger" />
            </div>
          </div>

          <div className="mb-3 row">
            <div className="col-sm-12">
                <label htmlFor="genero" className="col-sm-2 col-form-label">Género</label>
                <Field as="select" name="genero" className="form-select">
                <option value="">Seleccione...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
                </Field>
                <ErrorMessage name="genero" component="div" className="text-danger" />
            </div>
         </div>


          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Registrar Usuario</button>
          </div>
        </Form>

      </Formik>
    </div>
  );
};

export default FormularioRegistro;
