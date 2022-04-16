import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import firebase from '../../config/firebase'

import './detalhes.css'
import Navbar from '../../components/navbar'

export default function Detalhes() {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <img src="https://via.placeholder.com/150x100"
            className='img-banner' alt="Foto"
          />
        </div>

        <div className="row mt-5 d-flex justify-content-around">
          <div className="col-md-3 col-sm-12 box-info p-3 my-2">
            <i className='fa-solid fa-ticket fa-2x' />
            <h4><strong>Tipo</strong></h4>
            <span className='mt-3'>Festa</span>
          </div>

          <div className="col-md-3 col-sm-12 box-info p-3 my-2">
            <i className='fa-solid fa-calendar-days fa-2x' />
            <h4><strong>Data</strong></h4>
            <span className='mt-3'>15/04/2022</span>
          </div>

          <div className="col-md-3 col-sm-12 box-info p-3 my-2">
            <i className='fa-solid fa-clock fa-2x' />
            <h4><strong>Hora</strong></h4>
            <span className='mt-3'>20:57</span>
          </div>
        </div>

        <div className="row box-detalhes mt-5">
          <h4 className='text-center'><strong>Detalhes do Evento</strong></h4>
          <p className="p-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>

        <Link to="/" className='btn-editar'>
          <i className='fa-solid fa-square-pen fa-3x' />
        </Link>
      </div>
    </>
  )
}