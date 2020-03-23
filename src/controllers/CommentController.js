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
    createComment(data, setComment) {
        const options =  {
            method: 'POST',
            mode:"cors",
            body: JSON.stringify(data),
            headers:{ 'Content-Type': 'application/json' }
        }
        console.log("Guardando");
        fetch ('https://plix-backend.herokuapp.com/api/createComment/Comment', options)
        .then ((response) => {
            console.log("Comment saved", response);
            return response.json();
        })
        .then((newComment) =>{
            console.log('Success:', newComment);
            setComment(newComment);
        })
    }
}
export default new CommentController();