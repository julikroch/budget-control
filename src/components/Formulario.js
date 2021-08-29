import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';

const Formulario = ({guardarGasto, guardarCrearGasto, restante}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);
    const [errorRestante, guardarErrorRestante] = useState(false)

    const agregarGasto = e => {
        guardarError(false);
        guardarErrorRestante(false);

        e.preventDefault();

        if(cantidad < 1 || isNaN( cantidad) || nombre.trim() === '') {
            guardarError(true);
            return;
        }
        if(cantidad > restante){
            guardarErrorRestante(true)
            return;
        }

        guardarError(false);
        guardarErrorRestante(false);

        const gasto = {
            nombre, 
            cantidad, 
            id: shortid.generate()
        }

        guardarGasto(gasto);
        guardarCrearGasto(true);

        guardarNombre('');
        guardarCantidad(0);
    }

    return ( 
        <form onSubmit={agregarGasto} >
            <h2>Agrega tus gastos aquí</h2>

            { error && <Error mensaje="Ambos campos son obligatorios" /> }
            { errorRestante && <Error mensaje="El gasto no puede superar al presupuesto restante" /> }

            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. $300"
                    value={cantidad}
                    onChange={e => guardarCantidad( parseInt( e.target.value, 10 ) )}
                />
            </div>

            { restante > 0 ? 
                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Agregar Gasto"
                />
                : null
            }
        </form>
    );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;