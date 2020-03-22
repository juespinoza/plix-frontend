class UserController {
    login(data, setUser){
        const options =  {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{ 'Content-Type': 'application/json' }
        }
        fetch('https://plix-backend.herokuapp.com/api/userByEmail/User', options)
        .then(response => response.json())
        .then((userData) =>{
            console.log('Success:', userData);

            if (userData.length === 0) {
                setUser(null);
            }
            setUser(userData[0]);
        })
        .catch(error => console.error('Error:', error));
    }
}
export default new UserController();