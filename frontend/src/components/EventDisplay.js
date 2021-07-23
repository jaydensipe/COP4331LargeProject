import React, { useState, useEffect } from 'react';
import CommentBlock from '../components/CommentBlock';

function EventDisplay(props)
{
    var userId = "Hannah Wrigley";

    const[eventTitle, setEventTitle] = useState('');
    const[eventDesc, setEventDesc] = useState('');
    const[eventHost, setEventHost] = useState('');
    const[attendeeList, setAttendeeList] = useState('');
    const[eventGroup, setEventGroup] = useState('');
    const[eventTime, setEventTime] = useState('');
    const[eventLocation, setEventLocation] = useState('');
    const[eventComments, setEventComments] = useState([]);

    useEffect(() => {
        //TODO: Here, we would normally pull the event ID from the URL, get the event via API, 
        // and use it to get the event's data, but we'll use dummy data for now.

        var thisEvent={
            name: "Smash Tournament for NerdKnighteria",
            host: "Hannah Wrigley",
            description: "NerdKnighteria is holding a Smash 4 tournament at the Student Union at 3 on Monday. Bring snacks and controllers, cash prizes to be awarded up to 50$.",
            attendees: ["John Smith", "Alyx Reckahn", "Hannah Wrigley"],
            group: "NerdKnighteria of UCF",
            time: "July 31 2021, 3:00 PM",
            place: "Student Union, University of Central Florida, Orlando",
            comments: [
                {
                    user: "QuinnH",
                    text: "Hey guys, I can't come tonight; have to study for a test.",
                    time: ""
                },
                {
                    user: "ThomasMahBoi",
                    text: "Hannah, my friend who isn't in the club wanted to come in and watch the tournament; is that okay?",
                    time: ""
                },
                {
                    user: "badumtssXD",
                    text: "I have extra controllers if anyone wants them!",
                    time: ""
                }
            ]
        };

        setEventTitle(thisEvent.name + "\nEvent ID: " + props.eventId); //To test the parameter pass-in.
        setEventDesc(thisEvent.description);
        setEventHost(thisEvent.host);
        setAttendeeList(<div><p>{makeUsernameList(thisEvent.attendees)}</p></div>);
        setEventGroup(thisEvent.group);
        setEventTime(thisEvent.time);
        setEventLocation(thisEvent.place);
        setEventComments(thisEvent.comments);
    }, []);

    // Turn an array of users into a comma-separated string.
    function makeUsernameList(users)
    {
        var userList = "";
        for (var i = 0; i < users.length; i++)
        {
            userList += users[i];
            if (i < users.length-1)
            {
                userList += ", ";
            }
        }
        return userList;
    }

    //This function adds a comment to the list.
    function addComment(commentText)
    {
        //TODO: Use API call to send user ID number and comment to the server; the code to add the
        // visible comment should use the username instead of userId.
        var newComment = {
            user: userId,
            text: commentText
        };
        setEventComments([...eventComments, newComment]);
    }

    return(
        <div id="mainDiv" style={{width: "80%"}}>
            <br /><p style={{fontSize: "50px", marginTop: "0px", marginLeft: "15px", marginRight: "15px"}}>{eventTitle}</p>
            <p>Hosted by: {eventHost}</p>

            {/* Display the edit button to hosts and the attending checkbox to other users.*/}
            {
               eventHost == userId ?
                <button type="button" style={{width: "40%"}} class="buttons" onClick={() => window.location.href="/editevent/" + props.eventId}>Edit/Cancel Event</button>
                :
                <button type="button" style={{width: "40%"}} class="buttons" onClick={() => alert("Redirect to edit page")}>Join Event</button>
            }

            <span class="inner-title"></span><br />

            <img src="https://i.ticketweb.com/i/00/09/57/08/29_Original.jpg?v=6" class="imgeventpage"/><br/>
            
            <br /><span class="inner-title it_orange">Event Information</span><br />
            <div style={{width:"40%", marginLeft:"5%", marginRight: "4%", float:"left"}}>
                <p>{eventDesc}</p>
            </div>

            <div style={{width:"40%", marginLeft:"5%", marginRight: "4%", float:"left"}}>
                <p>{eventGroup}</p>
                <p>{eventTime}</p>
                <p>{eventLocation}</p>
            </div>
            <span class="inner-title it_orange"></span>

            <div>
            <span class="inner-title it_yellow">Event Attendees</span>
                {attendeeList} <br />
            <span class="inner-title it_yellow"></span>

            <span class="inner-title it_yellow">Comments</span>
                <CommentBlock comments={eventComments} submitCommand={addComment}/>
            <span class="inner-title it_yellow"></span>
            
            </div>

        </div>
        
    )
}

export default EventDisplay;