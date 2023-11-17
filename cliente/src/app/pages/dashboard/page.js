import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import ListUsers from "@/app/components/listUsers";
import styles from '../../../page.module.css'


export default async function Dashboard() {

    const listar = await getUsers();
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

            <div>
                <Suspense fallback={<p className={styles.suspense}>Loading...</p>}>


                    <ListUsers users={listar} />

                </Suspense>
            </div>
        </body>
    );
};