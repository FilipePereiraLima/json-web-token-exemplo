'use client'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../../page.module.css';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Register() {

  const [user, setUser] = useState({
    name:'',
    email: '',
    password: '',
  });

  const { push, refresh } = useRouter();

  const handlerChange = async (e) => {
    e.preventDefault();
    try{
      await postUser(user);
      return push("/pages/dashboard")
    }catch{
return toast.error("Erro")
    }
    toast.success("Usuario Cadastrado!");
  }
  return (
    <body className={styles.body}>

      <div className={styles.centernav} >
        <nav className={styles.nav}>
          <div className={styles.navdiv}>
            <a className={styles.alogin} href="/">
              Login
            </a>
            <a className={styles.alista} href="/pages/dashboard">
              Lista
            </a>
            <a className={styles.aalterar} href="/pages/dashboard/alter">
              Alterar
            </a>
            <a className={styles.aregister} href="/pages/dashboard/register">
              Registrar
            </a>
          </div>
        </nav>
      </div>

      <section className={styles.section}>
        <div className={styles.divform}>
          <h1 className={styles.h1registrar}>Registrar</h1>
          <form onSubmit={handlerChange}>
            <input className={styles.iptnome} placeholder='Name' type="text" required onChange={(e) => {setUser({ ...user, name:e.target.value});}}> </input>
            <input className={styles.iptemail} placeholder='E-mail' type="email" required onChange={(e) => {setUser({ ...user, email:e.target.value});}}></input>
            <input className={styles.iptsenha} placeholder='Senha' type='password' required onChange={(e) => {setUser({ ...user, password:e.target.value});}}></input>

            <button className={styles.button}>Cadastrar</button>
            <ToastContainer />
          </form>
        </div>
      </section>
    </body>
  )
}
