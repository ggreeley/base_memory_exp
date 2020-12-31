// generate sub and condition id
var sub_id = jsPsych.randomization.randomID(10);
var cond_id_temp = [1,2]
var cond_id = jsPsych.randomization.sampleWithoutReplacement(cond_id_temp, 1)

// define fixation
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '+',
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
  }

// define one list
var listA = ['green', 'blue', 'orange', 'red',
            'pink', 'black', 'purple', 'yellow']
// define another list
var listB = ['yellow', 'purple', 'black', 'pink',
            'red', 'orange', 'blue', 'green'];

// sample one of them
if (cond_id == 1) {
    var study_list = listA;
} else {
    if (cond_id == 2) {
    var study_list = listB;
}
}

var study_words = []
for (var i=0; i<study_list.length; i++){
    var word = {
        type: 'html-keyboard-response',
        stimulus: study_list[i],
        trial_duration: 3000,
        prompt: '(very unpleasant) 1 --- 2 --- 3 --- 4 --- 5 (very pleasant)',
        response_ends_trial: false
    }
    study_words.push(fixation,word);
}
// empty nodes, loop fix-i-fix-i ...
//var nodes = []
//for (var i=1; i<11; i++){
    //var node = {
        //type: 'html-keyboard-response',
        //stimulus: i,
        //trial_duration: 3000,
        //prompt: '(very unpleasant) 1 / 2 / 3 / 4 / 5 (very pleasant)',
        //response_ends_trial: false
    //}
    //nodes.push(fixation,node);
//}

// log extra data
jsPsych.data.addProperties({participant: sub_id});
jsPsych.data.addProperties({assigned_cond: cond_id});

// initiate experiment
jsPsych.init({
    timeline: study_words
});