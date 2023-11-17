'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from '../page.module.css'

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user);
      if (userAuth.token === undefined) {
        toast.error("Erro no email ou senha!");
      }

      push('/pages/dashboard');
    } catch {
      refresh();
    }
  }
  return (
    <body className={styles.body}>



      <section className={styles.section}>
      <div className={styles.divform}>
        <h1 className={styles.h1login}>Login</h1>
        <form onSubmit={handlerLogin}>
          <input
            placeholder='E-mail'
            type="email"
            onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
            className={styles.iptemail}>

          </input>
          <input
            placeholder='Senha'
            type='password'
            onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
            className={styles.iptsenha}>

          </input>
          <button className={styles.button} >Entrar</button>
          <ToastContainer />
        </form>
        </div>
        </section>
    </body>
  )
}
