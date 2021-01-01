var timeline = [];

var sub_id = jsPsych.randomization.randomID(10);
var cond_id_temp = [1,2];
var cond_id = jsPsych.randomization.sampleWithoutReplacement(cond_id_temp, 1);

var instr1 = {
    type: 'html-keyboard-response',
    stimulus: 'hello 1 hello 1 hello 1',
};

timeline.push(instr1);

var instr2 = {
    type: 'html-keyboard-response',
    stimulus: 'hello 2 hello 2 hello 2',
    choices: jsPsych.NO_KEYS,
    trial_duration: 3000,
}

timeline.push(instr2);

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '+',
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
    prompt: '(very unpleasant) 1 --- 2 --- 3 --- 4 --- 5 (very pleasant)'
  };

if (cond_id == 1) {
    var study_list_1 = listA;
    var study_list_2 = listB;
} else {
    var study_list_1 = listB;
    var study_list_2 = listA;
};

var encoding_1 = {
    timeline: [
            fixation,
        {
            type: 'html-keyboard-response',
            stimulus: jsPsych.timelineVariable('stim'),
            choices: [1,2,3,4,5],
            trial_duration: 3000,
            prompt: '(very unpleasant) 1 --- 2 --- 3 --- 4 --- 5 (very pleasant)',
            response_ends_trial: false
        }
    ],
    timeline_variables: study_list_1
};

timeline.push(encoding_1);

var encoding_2 = {
    timeline: [
            fixation,
        {
            type: 'html-keyboard-response',
            stimulus: jsPsych.timelineVariable('stim'),
            choices: [1,2,3,4,5],
            trial_duration: 3000,
            prompt: '(very unpleasant) 1 --- 2 --- 3 --- 4 --- 5 (very pleasant)',
            response_ends_trial: false
        }
    ],
    timeline_variables: study_list_2
};

timeline.push(encoding_2);

jsPsych.init({
    timeline: timeline
});