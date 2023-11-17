'use server'

const url = "https://aula-17-10-pi.vercel.app";
const getUserAuthenticated = async (user) => {
    const responseOfApi = await fetch(url + "/user/authenticated",
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
            const responseOfApi = await fetch (url + "/users",{
                next:{revalidate:10}
            });
            const listUsers = responseOfApi.json();

            return listUsers
        }catch{
            return null;
        }
}

export { getUsers, getUserAuthenticated };

const postUser = async (user) => {
    try{
        const responseOfApi = await fetch (url + "/user", {
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

/*

const user2 = [{
    name:"Filipe",
    email:"filipelima@gmail.com",
    password:"123lipe",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
},
{
    name:"Jose",
    email:"jose@gmail.com",
    password:"123jose",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
},
{
    name:"lucas",
    email:"lucas@gmail.com",
    password:"123lucas",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

},
{
    name:"Moonie",
    email:"moonie@gmail.com",
    password:"123moonie",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
},
{
    name:"Caio",
    email:"caio@gmail.com",
    password:"123caio",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
},
{
    name:"Vito",
    email:"vito@gmail.com",
    password:"123vito",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
},
{
    name:"Marcelino",
    email:"joao.santos@gmail.com",
    password:"123",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}

]

const getUserAuthenticated = (user) => {
var objeto = {}

    user2.map((users) => {
        if ( user.email == users.email && user.password == users.password) {
            objeto = users
        }
        
    } )

    return objeto

    //primeiro chamar a const user
    //depois add a funcao map
    // user seria o input e users o que ta na lista
}


*/