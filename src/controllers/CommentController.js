class CommentController {
    getAllComments(data, setComments){
        const options =  {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{ 'Content-Type': 'application/json' }
        }
        fetch('https://plix-backend.herokuapp.com/api/commentByMovie/Comment', options)
        .then(response => response.json())
        .then((commentsList) =>{
            console.log('Success:', commentsList);
            setComments(commentsList);
        })
        .catch(error => console.error('Error:', error));
    }
}
export default new CommentController();