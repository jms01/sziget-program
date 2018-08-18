# Sziget Festival Program 2018 scratchpad

Quick and dirty HTML files to mangle the Sziget Festival 2018 program data JSON file into something useful for me.
The HTML files use Vue.js and lodash, but are otherwise self contained.

All HTML files are recommended to be opened in Chrome.

[Sziget data blob location](https://widget.szigetfestival.com/data/sziget-festival-2018-en.json).

## mark-performance.html

This app allows to view a listing of all days, stages and performances.

Each performance can be marked, which is stored in local storage and used by this and the other apps.

Also you can play a preview, if one was added in the JSON data by Sziget.

Use this app to select the acts you would like to see, the schedule app can then make a customized and printable time schedule for you.

## mp3s.html

This app creates an [aria2](https://aria2.github.io/) input file which downloads all available preview mp3 files into a directory hierarchy with the following structure:

```
<day-of-month> <weekday>/<stage-rank> <stage-name>/<performance-start-time> <performer-name>.mp3
```

for example `8 Wednesday/01 Dan Panaitescu Main Stage/1600 Clean Bandit.mp3`

This can be used to create an offline store for all previews, which you can carry around on your phone without requiring an internet connection.

## schedule.html

This app renders a schedule for all stages that have marked performances (see mark-performance.html).

The text wrapping is a bit wonky, though.

Adjust the schedule for a specific day by changing the `selectedDay` Vue app data member. The number represents the day of the month, so 8 is the first day and 14 the last.

The rendered schedule is meant to be printed out using a Chrome browser so you can take it with you and does not rely on a battery or internet connection. Just keep it away from moisture ;)

To adjust the size of the schedule, so it will fit on one sheet of paper, change the height of the `ul` element.

# License

All code is licensed under the Mozilla Public License Version 2.0

Except for:

- [lodash.min.js](https://lodash.com/license) - Underscore-like license
- [vue.min.js](https://github.com/vuejs/vue/blob/master/LICENSE) - MIT license

