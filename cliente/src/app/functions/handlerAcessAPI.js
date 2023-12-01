'use server'

const url = "http://localhost:4000";
const getUserAuthenticated = async (user) => {
    const responseOfApi = await fetch(url + "/logar",
        {
            method:"POST",
            headers:{"Content-type":"Application/json"},
            body: JSON.stringify(user),
        }
    );
    const userAuth = await responseOfApi.json();
    console.log(userAuth)
    return userAuth;
}


const getUsers = async () =>{
        try{
            const responseOfApi = await fetch (url + "/usuarios/listar",{
                next:{revalidate:10}
            });
            const listUsers = responseOfApi.json();

            return listUsers
        }catch{
            return null;
        }
}



const postUser = async (user) => {
    try{
        const responseOfApi = await fetch (url + "/usuarios/cadastrar", {
            method: 'POST',
            headers: {'Content-Type': 'Application/json'},
            body: JSON.stringify(user)
        });
        const userSave = await responseOfApi.json();
        return userSave;
    }catch{
        return null;
    }
}

export { getUsers, getUserAuthenticated, postUser };