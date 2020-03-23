import React from 'react';
import { List, ListItem } from '@material-ui/core';

export default function Comments(props) {
    const { comments } = props;
 
    return(
        <React.Fragment>
            <List>
                { (comments.length !== 0) && (
                        comments.map(comment => (
                            <ListItem>
                                <b>{comment.email}: </b>
                                {comment.comment}
                            </ListItem>
                        ))
                    )
                }
            </List>
        </React.Fragment>
    );
}