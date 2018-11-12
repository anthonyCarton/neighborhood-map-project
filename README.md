This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run this project
### Fork it!
To run the project, fork it on [Github](https://github.com/anthonyCarton/neighborhood-map-project).

### Pull it!
Once you've forked the project, pull it.
```
git pull https://github.com/{your github profile}/neighborhood-map-project.git
```

### CD into it!
Now that you've pulled it down to your computer, change directories (CD) into the directory.
```
cd neighborhood-map-project
```

### Install npm
```
npm install
```

### Serve it up
```
npm start
```

### Open it!
In your favorite browser (Netscape! j/k) navigate to localhost:3000

---

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).

## APIs

### [Google Maps API](https://developers.google.com/maps/documentation/)
### [Colorado Information Marketplace: Liquor Licenses in Colorado](https://data.colorado.gov/Business/Liquor-Licenses-in-Colorado/ier5-5ms2)
### [Socrata SODA Consumer API: Liquor Licenses in Colorado](https://dev.socrata.com/foundry/data.colorado.gov/6a7f-q6ys)

## Resources

### General GTD Resources about building a React / Google Map project
#### [FEND P7 Walkthrough with Doug Brown](https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be)
Overall great walkthrough. Most things work, only a little redundant code. I may not have gotten there without this.

#### [How to Write a Google Maps React Component](https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component)
Overall good walkthrough, though I don't think this would have done it alone for me. These two sections were particularly helpful: [google-maps-react onReady](https://www.npmjs.com/package/google-maps-react#onready) and [google-maps-react Lazy Loading](https://www.npmjs.com/package/google-maps-react#sample-usage-with-lazy-loading-google-api)


#### [ScriptCache + React + Google Api](https://gist.github.com/auser/1d55aa3897f15d17caf21dc39b85b663)
Some starter code snippets, but most needed a bit of work. A few mistakes to overcome.

### General React Stuff that you may need to reference
#### [React componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount)
After I read this, my componentDidInFactMount().

#### [React setState](https://reactjs.org/docs/react-component.html#setstate)
Reviewed setState docs, now better understand how an object can be passed in.
Also didn't catch before that it's a best practice not to use the callback.

### General GAPI stuff
#### [React Animation](https://developers.google.com/maps/documentation/javascript/reference/marker#Animation)
Referenced to find out, a marker can pretty much only use DROP or BOUNCE.
