
// create a structure like below from the json blob
// days = [
//    {
//        // day 1
//        ...
//        places: [
//            {
//                // stage 1
//                programs: [
//                    {
//                        // performance 1
//                    }, ... // more performances
//                ]
//            }, ... // more stages
//        ]
//    }, ... // more days
// ];

// enhance stages (places) array from json blob
// remove stages without performances
var places = _.filter(programData.places, function(place){
    return place.programs.length > 0;
});
// create an array with enhanced stage objects
places = _.map(places, function(place, key){
    // add the key to the stage object
    place.id = key;

    // enhance the performances (programs) array
    place.programs = _.map(place.programs, function(programId){
        var program = programData.programs[programId];
        program.id = programId;
        program.marked = false;
        if (localStorage.getItem('mark-program-' + program.id)) {
            program.marked = true;
        }
        program.startDate = new Date(program.startDate);
        program.endDate = new Date(program.endDate);

        // retrieve the performer object and add it to the performance
        var performerId = program.performer;
        var performer = programData.performers[performerId];
        performer.id = performerId;
        program.performer = performer;

        return program;
    });
    place.programs = _.sortBy(place.programs, ['startDate']);

    return place;
});
// sort stages by some kind of popularity rank (big stages first, smaller ones lower down)
places = _.sortBy(places, ['rank']);

// enhance the days array from the json blob
var days = _.map(programData.days, function(day, key){
    var date = new Date(key);

    // days start and end at 6 in the morning instead of 12 at night
    day.startDate = _.clone(date);
    day.startDate.setHours(6);

    day.endDate = _.clone(day.startDate);
    day.endDate.setDate(day.endDate.getDate() + 1);

    // add a stages array to each day
    day.places = _.cloneDeep(places);
    // only keep performances for this day
    _.each(day.places, function(place){
        place.programs = _.filter(place.programs, function(program){
            var result = false;
            if (program.startDate > day.startDate && program.startDate < day.endDate) {
                result = true;
            }
            return result;
        });
    });

    // only keep places with performances this day
    day.places = _.filter(day.places, function(place){
        return place.programs.length > 0;
    });

    return day;
});
