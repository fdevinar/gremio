const Campground = require('../../models/campground');

const myFunctions = {
    isLoggedIn: 
    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        console.log('Failed to Authenticate');
        res.redirect('/login');
    },
    isOwner:
    async function isOwner(req, res, next){
        // ! isOwner of Campground below, implement Comment
        console.log(req.baseUrl);
        let authorized = false;
        if(await (req.isAuthenticated())){    
            // HANDLE CAMPGROUNDS OWNER
            if (req.baseUrl == '/campgrounds'){
                await Campground.findById(req.params.id, (err, campground) => {
                    if(err){
                        console.log(err);
                        return res.redirect('/campgrounds');
                    }else{
                        if (JSON.stringify(campground.createdBy.id) === JSON.stringify(req.user.id)){
                            console.log('User Authorized! Same Requester->ID as Campgrounds->Created by->ID');
                            authorized = true;
                            return next();
                        }
                    }
                })
            };
            // HANDLE COMMENTS OWNER
            if (req.baseUrl === '/comments'){
                console.log('HANDLE COMMENTS OWNER HERE');
            };
        };
        if (authorized){
            return
        }else{
            console.log('User Not Authorized to Update/Delete Campground');
            return res.redirect('/campgrounds');   
        }
    }
}

module.exports = myFunctions;