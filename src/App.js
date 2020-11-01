import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //state de la app
  const [ busqueda, GuardarBusqueda] = useState('');
  const [ imagenes, GuardarImagenes] = useState([]);
  //para hacer el paginador
  const [ paginactual, GuardarPaginactual] = useState(1);
  const [ totalpaginas, GuardarTotalpaginas] = useState(1);

  useEffect(() => {

    const consultarApi = async () =>{
      if(busqueda === '') return;
    
      const imagenesPorPagina = 30;
      const key = '18943772-801b99cd20db6c45bac9be438';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginactual}`;

      const repuesta = await fetch(url);
      const resultado = await repuesta.json();

      GuardarImagenes(resultado.hits);

      //Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina); // math.ceil redondea hacia arriba. ejemplo 16,6 = 17
      GuardarTotalpaginas(calcularTotalPaginas);

      //Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      
      jumbotron.scrollIntoView({ behavior: 'smooth'});// behavior: 'smooth' = tipo de animacion

    }

    consultarApi();
  }, [busqueda, paginactual]);

  //definir la pagina anterior
  const paginaAnterior = () =>{
    const nuevaPaginaactual = paginactual - 1;
    if(nuevaPaginaactual === 0) return;

    GuardarPaginactual(nuevaPaginaactual);
  }

  //definir la pagina siguiente
  const paginaSiguiente = () =>{
    const nuevaPaginaactual = paginactual + 1;
    if(nuevaPaginaactual > totalpaginas) return;

    GuardarPaginactual(nuevaPaginaactual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de Imagenes
        </p>
        <Formulario 
          GuardarBusqueda={GuardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />

        {
          (paginactual === 1 ) ? null : 
          (
            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={paginaAnterior}
            >&laquo; Anterior </button>
          )
        }



        {
          (paginactual === totalpaginas) ? null : 
          (
            <button
              type="button"
              className="btn btn-info"
              onClick={paginaSiguiente}
            >Siguiente &raquo;</button>
          ) 
        }
      </div>
    </div>
  );
}

export default App;
