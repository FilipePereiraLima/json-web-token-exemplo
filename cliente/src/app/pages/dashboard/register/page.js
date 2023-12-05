'use client'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../../page.module.css';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import { postUser } from "@/app/functions/handlerAcessAPI";

export default function Register() {

  const [user, setUser] = useState({
    usuario:'',
    senha: ''
  });

  const { push, refresh } = useRouter();

  const handlerRegister = async (e) => {
    e.preventDefault();
    try{
      await postUser(user);
      return push("/pages/dashboard")
    }catch{
return toast.error("Erro ao Cadastrar")
refresh();
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
            <a className={styles.aregister} href="/pages/dashboard/register">
              Registrar
            </a>
          </div>
        </nav>
      </div>

      <section className={styles.section}>
        <div className={styles.divform}>
          <h1 className={styles.h1registrar}>Registrar</h1>
          <form onSubmit={handlerRegister}>
          <input className={styles.iptnome} placeholder='Name' type="text" onChange={(e)=>{ setUser({...user, usuario: e.target.value})}}></input>
            <input className={styles.iptsenha} placeholder='Senha' type='senha' onChange={(e)=>{ setUser({...user, senha: e.target.value})}}></input>

            <button className={styles.button}>Cadastrar</button>
            <ToastContainer />
          </form>
        </div>
      </section>
    </body>
  )
}
