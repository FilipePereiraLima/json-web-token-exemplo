'use client'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../../page.module.css'


export default function Login() {

  const handlerChange = async (e) => {
    e.preventDefault();

    toast.success("Usuario Alterado!");

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
          <h1 className={styles.h1alterar}>Alterar</h1>
          <form onSubmit={handlerChange}>
            <input className={styles.iptnome} placeholder='Name' type="text" required></input>
            <input className={styles.iptemail} placeholder='E-mail' type="email" required></input>
            <input className={styles.iptsenha} placeholder='Senha' type='password' required></input>

            <button className={styles.button}>Alterar</button>
            <ToastContainer />
          </form>

        </div>
      </section>


    </body >
  )
}
