import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './card.css'

export default function EventCard() {
  return (
    <div className='col-md-3 col-sm-12'>
      <img src="https://via.placeholder.com/100x50"
        alt="Foto do evento"
        className="card-img-top img-cartao"
      />
      <div className='card-body'>
        <h5>Título do Evento</h5>
        <p className='card-text'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>

        <div className="row rodape-card d-flex">
          <div className='col-6'>
            <Link to="/" className='btn btn-sm btn-detalhes'>+ detalhes</Link>
          </div>
          <div className="col-6 eye">
            <i className='fas fa-eye' /><span>2019</span>
          </div>
        </div>
      </div>
    </div>
  )
}