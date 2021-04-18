<img src="public/images/roku-logo.png" width="300px">

# Roku Flashback Streaming Service

All your favourite movies right at your finger-tips, jus selet and watch (the trailer -- because copyright).

## Full User Capabilities

Signup for an account and you're off to the races. You can also create sub-accounts to your account and set up the user as adult or child. Child users are filtered to only show movies rated PG and under. If you change your mind about your avatar, no problem, accounts are easily editible, click the manage profiles button and you can change the attributes of users, as well as delete them; except for youre main account. You can't delete that one, you can still edit it though.

## Movies of All Genres

When you land on the home page you'll see a featured film ready for playing right off the hop. Scroll down and there are a plethora of genres to look through. Much like all your other Streaming Services you're going to see the same movie in a lot of places, that's because movies have multiple genres and they appear in all their respective genres.
The All Movies page is where you can find them all.. obviously. That way you can see the full grid and dont have to scoll through the same junk, but you still get to filter. 
When you select your movie you'll get to see all the details before making the choice to dive in. You can see others comments on the movie and after watching you can leave your 2 cents also!

## Music

You cant have just movies, this is the entertainment business! Go to the music app and search for any song you want and it'll probably be there. Pick your song and away you go! (just a preview tho.. that pesky copyright again)

## Installation

Server Repo - https://github.com/gavinbrown025/BrownG_HodgesK_RokuServer
You need MAMP, WAMP, XAMP, or an equivelant to run the app. 
Copy the repo to the file location of your choice. 
Import the database from config folder to your sql database engine: phpmyadmin, MySql Workbench, etc.
Chance the config/sqlCreds.js file to match your credentials. 
Run npm install on package.json file in both repos.
Run npm start on both files and go to localhost:5050 

## Tech Specs

For all you nerds out there, like me, here's the bread and butter. The app uses Vue, Handlebars, Sass, Node, Express, SQL/ the MEVN stack. 
Vue sends fetch calls that are proxied to the server via Vue router. The Express server catches the request and sends it to the correct server path, where Sql queries the database, GETs or POSTs the content. Then it is piped back through the routes and rendered with HBS where Vue components display the dynamic data.

Our roadmap is in the Google Doc's link below.
https://docs.google.com/document/d/1jOAbZyW0flxhGkXcPXWpiAXHSI4JuI8e0bxgU0gRqKM/edit?usp=sharing

XD Prototype:
https://xd.adobe.com/view/177c0f2a-e9e9-4773-a0b1-fa970e1e6337-422f/

### Authors

Gavin Brown, Katie Hodges

### License

Gavin Brown, Katie Hodges, Trevor Van Rys, MIT

sass --watch assets/sass:public/css --style compressed --no-source-map
