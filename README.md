# audioStream
(or whatever is futur name will be)

This is a node server to stream music. For now it comes with an angular client but it's mostly a placeholder to work on server functionality and it will be replaced.
It aim to stay light weight and work on a raspberry pi or other low power computer with minimal configuration.

This project is also a training project for a future bigger one, to improve my nodeJS and test some architectures.

RoadMap/Planned Features

1. Stream music on server from a webSite
  * stream from server to a web player
  * show all tracks on server with simple search
  * create catalog dynamically with correct metadata
  * see, manage, update and suppress catalog
  * create playlist
  * bulk mp3 upload

2. Add user gestion
  * role (admin/catalog creator/user)
  * catalog access by user
  * manage disk usage by catalog creator for admin

3. More and better client
  * Android client
  * Web app based on web component
  * Ubuntu touch client

4. Integration with other services via optional module system

5. (Add a real database instead of using json files, if it fit in the light and simple goal)


Actual task in progress :

* ~~stream music from node server~~ (done thanks to https://github.com/obastemur/mediaserver)
* make a client site with a music player (working but dirty and still buggy)
* ~~gather all music form server and serve it to client~~ (working)
* ~~create catalog server side via modulaire file scanner~~ (working, but the currents modules are placeholder)
* create client webpage for creating catalog (to do)
* create server logic and client page to see, manage, and update catalogs (to do)

Actual architectures

__start.js__ is declaring route for server function, and serving the client.

__musicList__ contains all the music functionality parts.  
 - __MusicManager__ is managing catalogs, load them, aggregate them to serv them as a complete music list, it also create them and can serve them as distinct object.
 - __Catalog__ are objects that contains all catalogs info, and can give one or all the tracks in it, save themself on the disk and use a MusicScanner to find new tracks.
 - __MusicScanner__ use the module system, where it load a music discovery and a metadata extracting methods from is module directory depending on parameters given a instantiation.

__client__ contains a fairly classic angular client with route.
