## Inspiration
We wanted an intuitive way to remotely monitor PCs and servers. There weren't very many great solutions available for remote monitoring so we decided to combine our mixed skill-sets and create an application for this purpose.

## What it does
It is a remote monitoring and task management system for PCs and servers. It 

## How we built it
We have four different components. The first component is the central hub server, written with Node.js and Socket.io. This server contains all of the user information, as well as the tools (Socket.io) for transmitting data live between PCs and web browser clients. The desktop application, written in Python, runs in the background and sends information to the server. It can also receive information to execute commands such as killing tasks. This application is installed through a Java-based installer, which registers the computer with the server and sets up the python app for background use. Finally, there is the web frontend written in Angular.js which displays all of the information to the user. We use a pleasing material design theme for it, as well as live charts and graphs (Chart.js) for displaying data. Overall, we used a diverse set of tools to accomplish this task, and because of this, we learned a lot doing it.

## Challenges we ran into
One large challenge we ran ito was communication between all of the different components involved with the application. For instance, we spent a lot of time trying to get Python to create parseable JSON for the web server, as well as a decent chunk of time figuring out how to structure the Socket.io live server.

## Accomplishments that we're proud of
The thing we are proud of most is being able to make all four components of the application communicate smoothly. This was one of our biggest challenges and yet we still managed to solve it and build an amazing application.

## What we learned
We learned how to combine different types of components, written in different languages with different purposes, to create one harmonious application. Some of us were new to the technologies we were using, such as Python and Socket.io.

## What's next for Spexy
Potentially more features, such as more powerful task/system controls, as well as many security updates to come. 
