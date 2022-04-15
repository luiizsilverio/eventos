import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import 'firebase/storage'

import firebase from '../../config/firebase'
import './card.css'

export default function EventCard({ id, img, titulo, detalhes, visualizacoes }) {
  const [urlImg, setUrlImg] = useState("")

  const storage = firebase.storage()

  useEffect(() => {
      storage.ref(`imagens/${img}`).getDownloadURL()
        .then((url) => setUrlImg(url))
        .catch(() => setUrlImg("https://via.placeholder.com/100x50"))
  }, [urlImg])


  return (
    <div className='col-md-3 col-sm-12'>
      <img src={ urlImg }
        alt="Foto do evento"
        className="card-img-top img-cartao"
      />
      <div className='card-body'>
        <h5>{ titulo }</h5>
        <p className='card-text'>{ detalhes }</p>

        <div className="row rodape-card d-flex">
          <div className='col-6'>
            <Link to={`/evento/${id}`}
              className='btn btn-sm btn-detalhes'>+ detalhes
            </Link>
          </div>
          <div className="col-6 eye">
            <i className='fas fa-eye' /><span>{ visualizacoes }</span>
          </div>
        </div>
      </div>
    </div>
  )
}