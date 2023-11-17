import styles from '../../page.module.css'

export default async function ListUsers({ users }) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return (
        <div className={styles.divcard}>
            {users?.map((user, index) =>
                <div className={styles.card}>

                    <p key={index}>
                        <span className={styles.plist}>{user.name}</span><br />
                        <span className={styles.plist}>{user.email}</span>
                    </p>
                </div>

            )}
        </div>
    )
}