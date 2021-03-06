//- MIDDLEWARE

const Campground = require('../../models/campground');
const Comment = require('../../models/comment');

const myFunctions = {
    isLoggedIn: 
    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        console.log('Failed to Authenticate');
        req.flash('error','User Not Logged In');
        res.redirect('/login');
    },
    isOwner:
    async function isOwner(req, res, next){
        if(await (req.isAuthenticated())){
            // HANDLE CAMPGROUNDS OWNER
            if (req.baseUrl == '/campgrounds'){
                Campground.findById(req.params.id, (err, campground) => {
                    if(err){
                        console.log(err);
                        return res.redirect('back');
                    }else{
                        if (campground.createdBy.id.equals(req.user.id)){
                            console.log('User Authorized! Requester.ID = Campgrounds.CreatedBy.ID');
                            return next();
                        }else{
                            req.flash('error','You don\'t have permission to do that');
                            return res.redirect('back');
                        }
                    }
                })
            };
            // HANDLE COMMENTS OWNER
            if (req.baseUrl.slice(-9,46) === '/comments'){
                await Comment.findById(req.params.id, (err, comment) => {
                    if(err){
                        console.log(err);
                        return res.redirect('back');
                    }else{
                        if (comment.author.id.equals(req.user.id)){
                            console.log('User Authorized! Requester.ID = Comment.Author.ID');
                            return next();
                        }else{
                            req.flash('error','You don\'t have permission to do that');
                            return res.redirect('back');
                        }
                    }
                })
            };
        };
    }
}

module.exports = myFunctions;