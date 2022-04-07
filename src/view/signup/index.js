import { useState } from "react";
import firebase from '../../config/firebase'
import 'firebase/auth'
import './signup.css'

export default function Signup() {
  return (
    <div className="form-cadastro">
      <form className="text-center form-login mx-auto mt-5">
        <h3 className="mb-3 text-black fw-bold">Cadastro</h3>
        <input type="email"
          className="form-control my-2"
          placeholder="E-mail"
        />
        <input type="password"
          className="form-control my-2"
          placeholder="Senha"
        />
        <button type="button"
          className="btn btn-lg mt-3 mb-5 text-white btn-cadastro"
        >
          Cadastrar
        </button>

      </form>
    </div>
  )
}