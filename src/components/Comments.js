import React from 'react';
import { List, ListItem } from '@material-ui/core';
import CommentController from '../controllers/CommentController';

export default function Comments(props) {
    const { comments } = props;
 
    return(
        <React.Fragment>
            <List>
                {
                    comments.map(comment => (
                        <ListItem>
                            <b>{comment.email}:</b>
                            {comment.comment}
                        </ListItem>
                    ))
                }
            </List>
        </React.Fragment>
    );
}