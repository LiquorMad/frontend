type SignInRequestData = {
    email: string;
    password: string;
}
export async function sigInRequest({email,password}: SignInRequestData){
    const JSONdata = JSON.stringify({email,password})
    const endpoint = 'http://127.0.0.1:3333/api/login';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
    }
    const response = await fetch(endpoint, options)

    if(response.status === 200){
        const data = await fetch(`http://127.0.0.1:3333/api/users/${email}`);
        const authUser = await data.json()
        return{
            user: authUser.user,
            token: authUser.token
        }
    }  
}
export async function recoverUSerInformation(token:string){
    const baseURL = `http://127.0.0.1:3333/api/usersToken/${token}`
    const data = await fetch(baseURL);
    const authUser = await data.json();
    return authUser;
}
