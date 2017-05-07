# russkyintoronto

## About

EmberJS reader for any pre-defined vk-group. Data is loaded using VK API end-point. It also provides a menu to get a statistics based on the fetched data.

## Settings

Application can be set up by editing services\settings.js file

* `name:` vk community name
* `groupId:` vk community group_id
* `defaultStatsAmount:` default number of posts to analyze for stats
* `defaultStatsButtonVal:` default numbeer of posts for 'Load More' button in Stats page
* `maxStatsValue:` maximum amount of posts to load per call on button press
* `postLoadAmount:` amount of posts to load on index page (portion)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd my-app`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
