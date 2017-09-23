# IDI Interview

#### Task 1
---

The first task is to reproduce a single web page based on a screenshot. This screenshot can be found in `docs/screenshot1.jpg`.

When recreating this page please only reproduce the layout and style as much as possible. No funcitonality, like button presses or links, is required.

To aid in reproducing this webpage we have bootstrapped a small project that will automate much of the setup. This project uses NPM, Gulp, Bootstrap and FontAwesome. All required fonts and images are included. The project also uses git. Please make relevant commits to your code and use branches as you need. All finished work should be merged to master.

*Note some sections of the page include elements such as profile/background images. Please use any images you like for these.*

All your work should be completed within the `src` directory. All HTML should be placed in `src/index.html` and all styles should be placed in `src/styles/styles.less`. Any images you would like to add to the page should be placed in `src/images/`.

To run the project please follow the following steps:

1. Install node.js and npm package manager for node
2. Install gulp
3. Get dependencies
    ```
    npm install
    ```
4. Run application
    ```
    gulp clean && gulp
    ```

As we are using a project with auto reload any changes you make to the HTML or styles will automatically reload the page. If you add any new images while the project is running please stop the project then rerun `gulp clean && gulp`
    
#### Task 2
---
The second task is to create a funcitonal notifications widget. This widget should be built with [AngularJS 1.6.x](https://angularjs.org/).

For this task there is no bootstrapped project. Please build the widget in anyway you like. You can find a screenshot of the widget in `docs/screenshot2.jpg`. In addition a JSON file is included that includes notification data to populate the widget.

Please create this task in a seperate directory and initialise a new git repo to track your work.

Your widget should:
* Match the screenshot style as much as possible
* Populate the widget using the data in the `data.json` file
* Use different icons and notification message depending on the notification type:
    * Message Notification:
        * Icon: http://fontawesome.io/icon/envelope-o/
        * "{{ name }} messaged you in {{ subject }}" (subject should be a link)
    * Forum Notification:
        * Icon: http://fontawesome.io/icon/comment-o/
        * "{{ name }} replied to you in {{ subject }}" (subject should be a link)
    * Gallery Notification: 
        * Icon: http://fontawesome.io/icon/picture-o
        * "{{ name }} uploaded new file to gallery {{ title }}" (title should be a link)
    * File Notification: 
        * Icon: http://fontawesome.io/icon/upload
        * "{{ name }} uploaded new file {{ filename }} to {{ module }}" (both filename and module should be a link)
* Each notification should show a user friendly timestamp
* Your widget should show all the notifications from the JSON file, not limited to 3 like the screenshot.

*Note anywhere it is stated you should use a link please just use a generic address, such as `#` or `http://google.com`*

##### Bonus Round
---
If you are able to create the above widget, there will be lots of bonus points if you are able to integrate your Angular widget into the webpage you created in Task 1. This step is not a requirement and should be treated as a challenge if you are able to complete Task 1 and Task 2. If you attempt this you will have to alter your widget to only show 3 notifications, not all.