# spofford-home

This is the code base for an extensible new website for Spofford design. 

It relies on the following dependencies:

Node 8.11.3
React 16.4.1

Postcss for style processing.

Test suite forthcoming.

Deployment infrasctructure from master branch forthcoming.

Hosting provided by AWS S3.

It will use contentful for content infrastructure (website copy, posts and other media channels, and potentially lightweight ecommerce). 

It will make a call to a lightweight API built in Elixir (link coming soon) for user signup infrastructure.

To get started:
I recommend ensuring that your machine is up to date on essential libraries. The standard and easiest way for doing this is to use homebrew (https://brew.sh/) Install this and run brew update and brew install ensure that all your local packages are up to date and talking to each other. 

Clone this project according to the instructions provided by github. After that, you need to install the dependencies enumerated in the package.json file. To do this:

npm install

Once that has finished type:

npm start

And visit:

localhost:3000

The server is now running for the website, and will update upon new changes to any file. Changes to webpack.config.js (which you should not make) require a server restart.

# notes on git and development

You should always work on a branch. Always. After getting the application gets started and you intend on making changes, start a new branch by type git checkout -b branch-name. Share your changes by pushing to github by typing:

git add .

then

git commit -m "my commit name"

then git push

I will be able to pull down the branch and verify the code. If it works then it will be merged into master for deployment.

