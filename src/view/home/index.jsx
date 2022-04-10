import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'

// import firebase from '../../config/firebase'
// import 'firebase/auth'
import './home.css'

export default function Home() {
  return (
    <>
      <Navbar />
      <h1>{ useSelector(state => state.email) }</h1>
    </>
  )
}
