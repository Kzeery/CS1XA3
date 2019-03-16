# Project02
## Webpagecv.html
Webpagecv.html is a HTML file that shows my resume website when opened in a browser. A template from https://startbootstrap.com/themes/resume/ was used as a basis for the creation. It is basic html and css with a little bit of JavaScript for things like scrolling effects on clicking the side buttons. The website contains my information such as name, links to my accounts, address and contact info, education, experience, skills, and completed projects. 

There is not much to be done on the website other than to read what is on it and test some of my projects. The YelpCamp project is deployed online at http://yelpcampyousif.herokuapp.com. If you like, you can go and create a login and post your own campground on the website! The particle fire simulation is  simply a nice simulation to gaze at. The Patatap project makes cool animations and sounds when pressing a keyboard button. Lastly, the To-Do List is just an asthetically pleasing method of listing to-dos. 

The website has already been deployed on http://yousifkzeer.ca if you would like to take a look at it without cloning the files from the repo. 

## Simpleapp.html
Simpleapp.html is an HTML file that allows you to play a click accuracy game when opened. It uses mostly jQuery to add things like click listeners to circles that are constantly being created, made smaller, and destroyed. Most of the html is already on the page but hidden, and specific buttons hide/unhide pages. There are 3 difficulty levels to the game: easy, medium, and hard. The easy difficulty has a maximum of 3 circles on the screen at once with an appearance rate of 1 circle/s. The medium difficulty has a maximum of 6 circles and an appearance rate of 2 circles/s. The hard difficulty has a maximum of 9 circles with an appearance rate of 3 circles/s.

When you start to play the game, you have one minute to get as high of a score as possible. You get a point by clicking a circle. The accuracy value is calculated by using the amount of circles you clicked divided by the total amount of circles clicked, incorrect clicks, and circles missed. The game logs your highscore for the session and the score of your most previous attempt.

There are two sounds that I linked externally. A "success" sound that occurs when a user clicks a circle from: https://freesound.org/people/grunz/sounds/109662/, and a "failure" sound that occurs when a user misses a circle or clicks incorrectly from: https://freesound.org/people/Splashdust/sounds/67454/. 

The settings page allows the user to do two things: toggle the sound and change the amount of time the user has to play. The time setting is two HTML inputs that can only have values between 0-59 and does not allow any characters other than numbers to be entered. It also handles when there is no input for time as 0. Toggling the sound simply sets a window variable "window.sound" to be off and changes the icon of the button. This variable is initially set to true on page load. 

Dependencies: Bootstrap 4 for styling, FontAwesome for icons, FreeSound for sounds, jQuery for scripting. 

If you would like to try out the game yourself without cloning the repo, it is hosted at: http://yousifkzeer.ca/simpleapp/index.html
