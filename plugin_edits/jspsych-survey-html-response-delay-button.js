/**
 * jspsych-survey-html-form
 * a jspsych plugin for free html forms
 *
 * Jan Simson
 *
 * documentation: docs.jspsych.org
 *
 */

jsPsych.plugins['survey-html-delay-button'] = (function() {

    var plugin = {};
  
    plugin.info = {
      name: 'survey-html-delay-button',
      description: '',
      parameters: {
        html: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
          pretty_name: 'HTML',
          default: null,
          description: 'HTML formatted string containing all the input elements to display. Every element has to have its own distinctive name attribute. The <form> tag must not be included and is generated by the plugin.'
        },
        preamble: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Preamble',
          default: null,
          description: 'HTML formatted string to display at the top of the page above all the questions.'
        },
        button_label: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Button label',
          default:  'Continue',
          description: 'The text that appears on the button to finish the trial.'
        },
        autofocus: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Element ID to focus',
          default: '',
          description: 'The HTML element ID of a form field to autofocus on.'
        },
        dataAsArray: {
          type: jsPsych.plugins.parameterType.BOOLEAN,
          pretty_name: 'Data As Array',
          default:  false,
          description: 'Retrieve the data as an array e.g. [{name: "INPUT_NAME", value: "INPUT_VALUE"}, ...] instead of an object e.g. {INPUT_NAME: INPUT_VALUE, ...}.'
        },
        autocomplete: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Allow autocomplete',
          default: false,
          description: "Setting this to true will enable browser auto-complete or auto-fill for the form."
        }//,
        // added by Garrett - need no button/auto-advance functionality
        //trial_duration: {
            //type: jsPsych.plugins.parameterType.INT,
            //pretty_name: 'Button activation delay',
            //default: 5000,
            //description:'Delays button activation ensure trial length. Default 10 sec for testing.'
        //}
      }
    }
  
    plugin.trial = function(display_element, trial) {
  
      var html = '';
      // show preamble text
      if(trial.preamble !== null){
        html += '<div id="jspsych-survey-html-delay-button-preamble" class="jspsych-survey-html-delay-button-preamble">'+trial.preamble+'</div>';
      }
      // start form
      if ( trial.autocomplete ) {
        html += '<form id="jspsych-survey-html-delay-button">'
      } else {
        html += '<form id="jspsych-survey-html-delay-button" autocomplete="off">'
      }
  
      // add form HTML / input elements
      html += trial.html;
  
      // add submit button
      html += '<input type="submit" id="jspsych-survey-html-delay-button-next" class="jspsych-btn jspsych-survey-html-delay-button" name="submit" value="'+trial.button_label+'" disabled></input>';
      //html += '<input type="submit" id="jspsych-survey-html-form-next" class="jspsych-btn jspsych-survey-html-form" value="'+trial.button_label+'"></input>';
      
      // function to activate button after 10 sec
      jsPsych.pluginAPI.setTimeout(function(){
          display_element.querySelector('#jspsych-survey-html-delay-button-next').disabled = null;
        }, 30000);
    
  
      html += '</form>';
      display_element.innerHTML = html;
  
      if ( trial.autofocus !== '' ) {
        var focus_elements = display_element.querySelectorAll('#'+trial.autofocus);
        if ( focus_elements.length === 0 ) {
            console.warn('No element found with id: '+trial.autofocus);
        } else if ( focus_elements.length > 1 ) {
            console.warn('The id "'+trial.autofocus+'" is not unique so autofocus will not work.');
        } else {
            focus_elements[0].focus();
        }
      }
  
      display_element.querySelector('#jspsych-survey-html-delay-button').addEventListener('submit', function(event) {
        // don't submit form
        event.preventDefault();
  
        // measure response time
        var endTime = performance.now();
        var response_time = endTime - startTime;
  
        var question_data = serializeArray(this);
  
        if (!trial.dataAsArray) {
          question_data = objectifyForm(question_data);
        }
  
        // save data
        var trialdata = {
          "rt": response_time,
          "responses": JSON.stringify(question_data)
        };
  
        display_element.innerHTML = '';
  
        // next trial
        jsPsych.finishTrial(trialdata);
      });
  
      var startTime = performance.now();
      
    };
  
    /*!
     * Serialize all form data into an array
     * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
     * @param  {Node}   form The form to serialize
     * @return {String}      The serialized form data
     */
    var serializeArray = function (form) {
      // Setup our serialized data
      var serialized = [];
  
      // Loop through each field in the form
      for (var i = 0; i < form.elements.length; i++) {
        var field = form.elements[i];
  
        // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
        if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
  
        // If a multi-select, get all selections
        if (field.type === 'select-multiple') {
          for (var n = 0; n < field.options.length; n++) {
            if (!field.options[n].selected) continue;
            serialized.push({
              name: field.name,
              value: field.options[n].value
            });
          }
        }
  
        // Convert field data to a query string
        else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
          serialized.push({
            name: field.name,
            value: field.value
          });
        }
      }
  
      return serialized;
    };
  
    // from https://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery
    function objectifyForm(formArray) {//serialize data function
      var returnArray = {};
      for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
      }
      return returnArray;
    }
  
    return plugin;
  })();