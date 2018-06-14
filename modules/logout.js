
// if (logout.button) == 'clicked'  {
//     check session stored
//     if (none){
//         render message ('You are not logged in, please login')
//     } else {
//         destroy session && redirect to homepage
//     }
// }

var session = require('express-session');

app.get('/logout', (req,res) => {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});