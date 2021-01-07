var timeline = [];

var sub_id = jsPsych.randomization.randomID(10);
var cond_id_temp = [1,2];
var cond_id = jsPsych.randomization.sampleWithoutReplacement(cond_id_temp, 1);

jsPsych.data.addProperties({sub_id: sub_id, cond_id: cond_id})

var instr1 = {
    type: 'html-keyboard-response',
    stimulus: '<p> This toy/experiment uses JavaScript, HTML, and some custom CSS. It relies on the jsPsych library and the source code is hosted on cognition.run.</p>' +
    '<p>I built most of this over the course of two afternoons and, in its current form, is only ~140 lines of code, not including stimuli (held in separate js file).</p>' +
    '<p>Hosting on cognition.run (pavlovia would work, too) is nice because all data is logged there and stored on secure AWS server space (just like Chatplat) until download.</p>' +
    '<p>Running through a few examples will only take a couple minutes. Press any key to get started!</p>'
};

timeline.push(instr1);

var instr2 = {
    type: 'html-keyboard-response',
    stimulus: '<h1>Instructions Page 1:</h1>' +
    '<p>This toy/example experiment will run through a handful of encoding/recall phases to demonstrate jsPsych functionality.</p>' +
    '<p>There will be two short study lists, each including some colors. The order is randomized according to condition (I built in random assignment).</p>' +
    '<p>One list will be seen twice (whatever one was seen first) - this is just to demonstrate one possible encode/recall scheme.</p>' +
    '<p>They go quick (because this is an example), but you can use keys 1-5 to rate pleasantness.</p>' +
    '<p>The procedure will go as follows: study list 1 -> recall -> study list 2 -> recall -> study list 1 -> recall -> recall.</p>' +
    '<p>Press "enter" or "return" to continue</p>'
};

timeline.push(instr2);

var instr3 = {
    type: 'html-keyboard-response',
    stimulus: '<h1>Instructions Page 2:</h1>' +
    '<p>There will be four recalls.</p>' +
    '<p>The first recall has two boxes you can type into. This recall is untimed, advance whenever you like. The nubmer, size, and style of boxes is flexible.</p>' +
    '<p>The second recall has a text box on the left that can record responses (notes, recall, etc.)' + 
    '*and* a Chatplat prompt (1 min recall to host time-restricted collaborative or individual recall) on the right.'+
    'With such a setup, we could have participants note down perceptions of group-mates during interaction.</p>' +
    '<p>The third recall is just a Chatplat prompt - 1 min recall, *no button below*, and auto-advance after duration.</p>' +
    '<p>The fourth recall is like before, but contained in my program (timed, advance option after 30 sec). Again, number and style of boxes is flexible.' +
    'Individual data could be collected this way.</p>' +
    '<p>Press "Enter" to Begin</p>'
}

timeline.push(instr3);

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
            choices: [49,50,51,52,53],
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
    '<div class="inline-div"><textarea name="recall1box1" type="text" id="test-resp-box1"></textarea></div>' +
    '<div class="inline-div"><textarea name="recall1box2" type="text" id="test-resp-box2"></textarea></div>',
    autofocus: 'test-resp-box1'
}; 

timeline.push(recall_1);

var encoding_2 = {
    timeline: [
            fixation,
        {
            type: 'html-keyboard-response',
            stimulus: jsPsych.timelineVariable('stim'),
            choices: [49,50,51,52,53],
            trial_duration: 1000,
            prompt: '(very unpleasant) 1 --- 2 --- 3 --- 4 --- 5 (very pleasant)',
            response_ends_trial: false
        }
    ],
    timeline_variables: study_list_2
};

timeline.push(encoding_2);

// note: the way chatplat is embedded below is interesting.
// could use that method to embed websites as stimuli
var recall_2 = {
    type: 'survey-html-form',
    preamble: '<p> Please type all the words you can remember, in any order that you prefer. </p>' +
    '<p> You can use the box on the left for notes. Use the screen on the right to send items to a partner (pretend for pilot). </p>',
    // relies on custom css / textarea html - very handy for recall 
    html: 
    '<div class="inline-div"><textarea name="recall2box1" type="text" id="test-resp-box1"></textarea></div>' +
    `<iframe height=500 width=700 frameborder="no" src="https://chatplat.com/#/Chat/3835/3rkRQ0hYrEqmi9c//${sub_id}"></iframe><br>&nbsp;`,
    autofocus: 'test-resp-box1'
}; 

timeline.push(recall_2);

timeline.push(encoding_1);

// able to time a recall by ebedding html into html-keyboard response var!
//
//var recall_3 = {
    //type: 'survey-html-form-timed-NEW',
    //preamble: '<p> Please type all the words you can remember, in any order that you prefer. </p>' +
    //'<p> This time you only have 30 seconds!!! </p>',
    //html: '<div class="inline-div"><textarea name="recall3box1" type="text" id="test-resp-box1"></textarea></div>',
    //trial_duration: 5000
//};

var recall_3 = {
    type: 'html-keyboard-response',
    stimulus: '<p> Please type all the words you can remember, in any order that you prefer. </p>' +
    '<p> Use the screen below to submit words you recall, submitting one at a time. Please work on this task until the window deactivates. You will be advanced automatically.</p>',
    // relies on custom css / textarea html - very handy for recall 
    prompt:`<iframe height=500 width=700 frameborder="no" src="https://chatplat.com/#/Chat/3835/3rkRQ0hYrEqmi9c//${sub_id}"></iframe><br>&nbsp;`,
    response_ends_trial: false,
    trial_duration: 65000
}

timeline.push(recall_3);

// relies on custom plugin that delays button activation (default 30 sec for testing)
var recall_4 = {
    type: 'survey-html-delay-button',
    preamble: '<p> Please type all the words you can remember, in any order that you prefer. </p>' +
    '<p> You can use the box, entering one word at a time. You will be able to advance after 30 seconds. </p>',
    // relies on custom css / textarea html - very handy for recall 
    html: 
    '<div class="inline-div"><textarea name="recall4box1" type="text" id="test-resp-box1"></textarea></div>',
    autofocus: 'test-resp-box1',
    button_label: 'Continue onto debrief',
    button_duration: 10000 // time to keep button disabled (ensuring subject stays on page.
    // if excluded, button is auto-active, identical to survey-html-form plugin.
}

timeline.push(recall_4);

var recall_5 = {
    type: 'survey-html-response-timed',
    preamble: '<p> Please type all the words you can remember, in any order that you prefer. </p>' +
    '<p> You can use the box, entering one word at a time. You will auto-advance after 10 seconds. </p>',
    // relies on custom css / textarea html - very handy for recall 
    html: 
    '<div class="inline-div"><textarea name="recall5box1" type="text" id="test-resp-box1"></textarea></div>',
    autofocus: 'test-resp-box1',
    trial_duration: 10000
}

timeline.push(recall_5);

var closeInstr1 = {
    type: 'survey-html-form',
    preamble: '<p>That concludes this example experiment.</p>' +
    '<p>This example only scratches the surface - there is a lot of flexibility. I have embedded the jsPsych site in case you are interested.</p>' +
    '<p>When ready, click "Finish" and then close the tab.</p>',
    html: `<iframe height=500 width=700 frameborder="no" src="https://www.jspsych.org/"></iframe><br>&nbsp;`,
    button_label: 'Finish'
};

timeline.push(closeInstr1);


jsPsych.init({
    timeline: timeline,
    show_progress_bar: true
});