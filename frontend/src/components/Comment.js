import React from 'react';


function Comment(props)
{
    // Generates a random color to use for the user icon.
    var randomColor = Math.floor(Math.random()*16777215).toString(16);

    return(
        <div class="comments">
            <p style={{fontSize: "22px"}}><i class="fa fa-user-circle userIcon" style={{color: "#" + randomColor}} 
                aria-hidden="true"></i> <b>{props.comment.user}<p class="date">{props.comment.date}</p></b></p>
            <p style={{fontSize: "20px", paddingBottom: "10px"}}>{props.comment.text}</p>
        </div>
    )
}

export default Comment;