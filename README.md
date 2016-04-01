# A Song a Day
A small website to create a facebook post as well as an entry in the YouTube channel of A Song a Day with one click.

All the code is hosted on the gh-pages branch (pure client side JavaScript), head over there to take a look!

## Current Issues and TODO:
1. Publishing to the google playlist does not work as of now. I'm trying to talk to the Google Devs to find out why.
2. Planning to shift to a backend version if point **1.** does not work out. Reason: 
    * So the problem with **1.** is that Google is returning a 403 forbidden when the app tries to post to a playlist which I **collaborate** to, even though ideally I should have permissions to post to it.
    * The solution: use one account to post to a playlist **owned** by that account.
    * The resulting problem: I cannot host the entire code in the frontend (specially the account credentials) if I'm using one account to post to the youtube channel. Hence I'd have to shift it to server side, where the user does not have access to the credentials.
    * Another random problem + solution: So if I use one account to post to youtube, I still need to restrict this privilege to only those users who are a part of the group. This means the whole flow of (a) Post to facebook (b) Post to google only of (a) was successful (that would imply the user is a part of the group): has to happen in one go. This can be ensured only through the backend.
    
