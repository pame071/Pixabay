import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({GuardarBusqueda}) => {

   const [ termino, GuardarTermino ] = useState('');
   const [ error, GuardarError ] = useState(false);

   const buscarImagenes = e => {
      e.preventDefault();

      //validar
      if(termino.trim() === ''){
         GuardarError(true);
         return;
      }
      GuardarError(false);

      // enviar el termino de búsqueda hacia el componente principal
      GuardarBusqueda(termino);
   }
   return (
      <form
         onSubmit={buscarImagenes}
      >
         <div className="row">
            <div className="form-group col-md-8">
               <input 
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Busca una imagen, ejemplo: futbol o café"
                  onChange = { e => GuardarTermino(e.target.value)}
               />
            </div>
            <div className="form-group col-md-4">
               <input 
                  type="submit"
                  className="btn btn-lg btn-danger btn-block"
                  value="Buscar"
               />
            </div>
         </div>

         { error ? <Error mensaje="Agregar un término de búsqueda"/> : null }
      </form>
   );
};

Formulario.propTypes = {
   GuardarBusqueda: PropTypes.func.isRequired,
};

export default Formulario;