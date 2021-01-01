// set timeline
var timeline = [];

// generate sub and condition id
var sub_id = jsPsych.randomization.randomID(10);
var cond_id_temp = [1,2];
var cond_id = jsPsych.randomization.sampleWithoutReplacement(cond_id_temp, 1);

// define fixation
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '+',
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
  }

// define one list
var listA = ['green', 'blue', 'orange', 'red',
            'pink', 'black', 'purple', 'yellow'];
// define another list
var listB = ['yellow', 'purple', 'black', 'pink',
            'red', 'orange', 'blue', 'green'];

// sample one of them
if (cond_id == 1) {
    var study_list_1 = listA;
    var study_list_2 = listB;
} else {
    var study_list_1 = listB;
    var study_list_2 = listA;
};

var study_words_1 = [];
for (var i=0; i<study_list_1.length; i++){
    var words_1 = {
        type: 'html-keyboard-response',
        stimulus: study_list_1[i],
        trial_duration: 3000,
        prompt: '(very unpleasant) 1 --- 2 --- 3 --- 4 --- 5 (very pleasant)',
        response_ends_trial: false
    }
    study_words_1.push(fixation,words_1);
};

timeline.push(study_words_1)

var study_words_2 = [];
for (var i=0; i<study_list_2.length; i++){
    var words_2 = {
        type: 'html-keyboard-response',
        stimulus: study_list_2[i],
        trial_duration: 3000,
        prompt: '(very unpleasant) 1 --- 2 --- 3 --- 4 --- 5 (very pleasant)',
        response_ends_trial: false
    }
    study_words_2.push(fixation,words_2);
};

timeline.push(study_words_2);

// log extra data
jsPsych.data.addProperties({participant: sub_id});
jsPsych.data.addProperties({assigned_cond: cond_id});

// initiate experiment
jsPsych.init({
    timeline: timeline
});