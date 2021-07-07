import React, { useState } from 'react';

function Register(){   

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    
    var registerFirstName;
    var registerLastName;
    var registerUsername;
    var registerPassword;
    const [message, setMessage] = useState('');

    const Register = async event =>     
    {    
        event.preventDefault();        
        var tok = storage.retrieveToken();       
        var obj = {firstName:registerFirstName.value, lastName:registerLastName.value, login:registerUsername.value, password:registerPassword.value,jwtToken:tok};       
        var js = JSON.stringify(obj);       
        try        
        {            
            const response = await fetch(bp.buildPath('api/adduser'),            
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var txt = await response.text();            
            var res = JSON.parse(txt);            
            if( res.error.length > 0 )            
            {                
                setMessage( "API Error:" + res.error );            
            }            
            else            
            {                
                setMessage('user has been added');            
                var retTok = res.jwtToken;
                storage.storeToken( retTok );
            }        
        }        
        catch(e)        
        {            
            setMessage(e.toString());        
        }
    };
    
    return(      
        <div id="mainDiv">               
            <span id="inner-title">Sign up</span><br />        
            <input type="text" id="loginName" placeholder="First Name" 
                ref ={(c) => registerFirstName = c} /><br />
            <input type="text" id="loginName" placeholder="Last Name" 
                ref ={(c) => registerLastName = c} /><br />
            <input type="text" id="loginName" placeholder="Username" 
                ref ={(c) => registerUsername = c} /><br />        
            <input type="password" id="loginPassword" placeholder="Password" 
                ref ={(c) => registerPassword = c}/><br />
            <input type="submit" id="registerButton" class="buttons" value = "Register"          
                onClick={Register} />
            <span id="registerResult">{message}</span> 
            <span id="smaller-inner-title">Already have an account?<a href={'/login'}> Log in.</a></span><br />    
        </div>    
    );
};

export default Register;