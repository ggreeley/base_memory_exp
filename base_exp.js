var timeline = [];

var sub_id = jsPsych.randomization.randomID(10);
var cond_id_temp = [1,2];
var cond_id = jsPsych.randomization.sampleWithoutReplacement(cond_id_temp, 1);

var instr1 = {
    type: 'html-keyboard-response',
    stimulus: '<h1>Instructions Page 1:</h1>' +
    'Press "enter" or "return" to continue'
};

timeline.push(instr1);

var instr2 = {
    type: 'html-keyboard-response',
    stimulus: '<h1>Instructions Page 2:</h1>' +
    'Press "Enter" to Begin'
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
            trial_duration: 1000,
            prompt: '(very unpleasant) 1 --- 2 --- 3 --- 4 --- 5 (very pleasant)',
            response_ends_trial: false
        }
    ],
    timeline_variables: study_list_1
};

timeline.push(encoding_1);

var recall_1 = {
    type: 'survey-html-form',
    preamble: '<p> Please type all the words you can remember, in any order that you prefer. </p>' +
    '<p> After entering a word, use a comma and press enter/return to begin entering the next word. </p>',
    // relies on custom css / textarea html - very handy for recall 
    html: 
    '<div class="inline-div"><textarea name="recall1box1" type="text" id="test-resp-box" class="inline-textarea"></textarea></div>' +
    '<div class="inline-div"><textarea name="recall1box2" type="text" id="test-resp-box" class="inline-textarea"></textarea></div>',
    autofocus: 'test-resp-box',
    trial_duration: 10000
}; 

timeline.push(recall_1);

var encoding_2 = {
    timeline: [
            fixation,
        {
            type: 'html-keyboard-response',
            stimulus: jsPsych.timelineVariable('stim'),
            choices: [1,2,3,4,5],
            trial_duration: 1000,
            prompt: '(very unpleasant) 1 --- 2 --- 3 --- 4 --- 5 (very pleasant)',
            response_ends_trial: false
        }
    ],
    timeline_variables: study_list_2
};

timeline.push(encoding_2);

var recall_2 = {
    type: 'survey-html-form',
    preamble: '<p> Please type all the words you can remember, in any order that you prefer. </p>' +
    '<p> After entering a word, use a comma and press enter/return to begin entering the next word. </p>',
    // relies on custom css / textarea html - very handy for recall 
    html: 
    '<div class="inline-div"><textarea name="recall2box1" type="text" id="test-resp-box" class="inline-textarea"></textarea></div>' +
    '<div class="inline-div"><textarea name="recall2box2" type="text" id="test-resp-box" class="inline-textarea"></textarea></div>',
    autofocus: 'test-resp-box',
    trial_duration: 10000
}; 

timeline.push(recall_2);

jsPsych.init({
    timeline: timeline,
    show_progress_bar: true
});