Liri!

An app created using Node.js to find concerts, movies, or songs using the command line:

To use the app:

** you will need to get the apis keys for spotify, omdb and bandsintown; create a .env file with the keys with the following structure:

    # OMDb
    omdb_key=<your key here>

    #spotify
    SPOTIFY_ID=<your key here>
    SPOTIFY_SECRET=<your key here>

1. Open command line and go to root folder and run 'npm -i' to install the required packages
2. The commands are as follow:
    concert-this '<band name here>' --> this will go into band API to get the info
    spotify-this-song '<song name here>' --> this will go into spotify API to get info
    movie-this '<movie name here>' --> this will go into omdb to get movie info
    do-what-it-says  --> this will read random.txt file and do what it says.

Example: node liri.js movie-this pretty woman

video: https://drive.google.com/file/d/1Ep6NaZ_OXXl_G7UmevRE_miF6asCTW7k/view

