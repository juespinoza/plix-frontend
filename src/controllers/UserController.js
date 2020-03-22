class UserController {
    login(data, setUser){
        const options =  {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{ 'Content-Type': 'application/json' }
        }
        fetch('https://plix-backend.herokuapp.com/api/userLogin/User', options)
        .then(response => response.json())
        .then((userData) =>{
            console.log('Success:', userData);
            setUser(userData);
        })
        .catch(error => console.error('Error:', error));
    }
}
export default new UserController();