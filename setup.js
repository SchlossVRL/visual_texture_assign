

/// create a function called setupExperiment() that will be called when the page loads
function setupExperiment() {



var jsPsych = initJsPsych({
    on_finish: function() {
        jsPsych.data.displayData();
      }
    }
);

const subject_id = jsPsych.randomization.randomID(10);
const filename = `${subject_id}.csv`;
jsPsych.data.addProperties({
    subject: subject_id
    });


var timeline = [];


var consent = {
  type: jsPsychSurveyMultiSelect,
  questions: [
      {prompt:
      "  <strong>UNIVERSITY OF WISCONSIN-MADISON</strong>" +
      "  <br><strong>Research Participant Information and Consent Form</strong>" +
      " <br><br><strong>Title of the Study:</strong> Investigating how observers perceive, interpret, and evaluate visual features in 2D scenes and 3D environments" +
      " <br><br><strong>Principal Investigator:</strong> Karen B. Schloss (phone: 608-316-4495) (email: kschloss@wisc.edu)" +
      "  <br><br><strong><u>DESCRIPTION OF THE RESEARCH</u></strong>" +
      "  <br>You are invited to participate in a research study about how visual features influence the ability to perceive, interpret, navigate, and remember information in visual displays" +
      "  <br><br>You have been asked to participate because you accepted the HIT on Amazon Mechanical Turk." +
      "  <br><br>The purpose of the research is to understand principles by which people perceive, evaluate and interpret visual information (e.g., the meaning of parts of a scientific diagram)." +
      "  <br><br>This study will include adults (at least 18 yrs) from who participate in Amazon Mechanical Turk HITs." +
      "  <br><br>The research will be conducted on the electronic device that you are using." +
      "  <br><br><strong><u>WHAT WILL MY PARTICIPATION INVOLVE?</u></strong>" +
      "  <br>If you decide to participate in this research you will be presented with visual displays containing images and/or text and will be asked to make judgments about them. For example, you may see shapes and be asked how round they appear or view a graph with a legend and interpret information about the data in the graph. You will be asked to respond by making button presses on a keyboard/mouse. You may be asked to complete questionnaires about your expertise or educational level in a given domain (e.g., neuroscience) and questionnaires about what sorts of things you like/dislike. Finally, you may be asked to respond to questions about your experience during the experiment (e.g., how much you enjoyed the task)." +
      "  <br><br>You will be asked to complete 2-6 surveys or tasks." +
      "  <br><br>Your participation will last approximately 5 min - 60 min per session and will require 1 session." +
      "  <br><br><strong><u>ARE THERE ANY RISKS TO ME?</u></strong>" +
      "  <br>We don't anticipate any risks to you from participation in this study." +
      "  <br><br><strong><u>ARE THERE ANY BENEFITS TO ME?</u></strong>" +
      "  <br>We don't expect any direct benefits to you from participation in this study." +
      "  <br><br><strong><u>WILL I BE COMPENSATED FOR MY PARTICIPATION?</u></strong>" +
      "  <br>The amount of compensation depends on the length of the task, based on a rate of $7.25 per hour. The compensation amount for this HIT, as specified in the HIT description, was pre-determined based on the amount of time it took previous participants to do similar tasks."+
      "  <br><br>If you do withdraw prior to the end of the study, you will receive no compensation." +
      "  <br><br><strong><u>HOW WILL MY CONFIDENTIALITY BE PROTECTED?</u></strong>" +
      "  <br>Participant information will remain confidential. Neither your name or any other identifiable information will be recorded. Typically, group characteristics will be published, but datasets with individual responses may also be shared. In such cases, the data will not be linked to your name or other identifiable information." +
      "  <br><br><strong><u>WHOM SHOULD I CONTACT IF I HAVE QUESTIONS?</u></strong>" +
      "   <br>You may ask any questions about the research at any time. If you have questions about the research you can contact the Principal Investigator Karen B. Schloss at 608-316-4495." +
      "   <br><br>If you are not satisfied with response of research team, have more questions, or want to talk with someone about your rights as a research participant, you should contact the Education and Social/Behavioral Science IRB Office at 608-263-2320." +
      "  <br><br>Your participation is completely voluntary. If you decide not to participate or to withdraw from the study you may do so without penalty." +
      "  <br><br>By clicking the box below, you confirm that you have read this consent form, had an opportunity to ask any questions about your participation in this research and voluntarily consent to participate. You may print a copy of this form for your records." +
      "  <br><br>Please click the box below next to the text 'I consent' to give your informed consent to participate. " +
      "   </p>",
      options: ["<strong>I consent</strong>"],
      // horizontal: false,
      required: true,
      // name: 'Consent'
    },
      ],
  button_label: "Start Experiment",
  };


var instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p>Instructions Here! Do the thing! Thanks! Now press the spacebar.</p>
  `,
};

// timeline.push(welcome);
timeline.push(consent);
texturePairs = {0:['sand','paper'], 1:['rubber','paper'],2:['rubber','felt'],3:['sand','felt'],
                    4:['sand','rubber'],5:['felt','paper']};
concepts = ['lion','badger'];

imPaths = []
  for(var i=0;i<Object.keys(texturePairs).length;i++){
    imPaths.push(`img/${texturePairs[i][0]}_${texturePairs[i][1]}.png`)
    imPaths.push(`img/${texturePairs[i][1]}_${texturePairs[i][0]}.png`)
  }
  var preload = {
    type: jsPsychPreload,
    images: imPaths
  }
  timeline.push(preload);



timeline.push({
  type: jsPsychFullscreen,
  fullscreen_mode: true,
})
timeline.push(instructions);


numReps = 4;

for(block=0;block<numReps;block++){

blockTrials =[]
for(var i=0;i<Object.keys(texturePairs).length;i++){
  for(j=0;j<concepts.length;j++){
  // console.log('normal pair',texturePairs[i])
  // console.log('reverse pair',_.reverse(texturePairs[i]))
  assignTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p style="font-size:50px">${concepts[j]}</p><img src="img/${texturePairs[i][0]}_${texturePairs[i][1]}.png" style="height:350px">`,
    choices: ['ArrowLeft', 'ArrowRight'],
    post_trial_gap: 200,
    data: {
      left: texturePairs[i][0],
      right: texturePairs[i][1],
      concept: concepts[j]
    }
  }
  blockTrials.push(assignTrial);
  assignTrial_R = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<p style="font-size:50px">${concepts[j]}</p><img src="img/${texturePairs[i][1]}_${texturePairs[i][0]}.png" style="height:350px">`,
    choices: ['ArrowLeft', 'ArrowRight'],
    post_trial_gap: 200,
    data: {
      left: texturePairs[i][1],
      right: texturePairs[i][0],
      concept: concepts[j]
    }
  }
  blockTrials.push(assignTrial_R);
}}
blockTrials = jsPsych.randomization.shuffle(blockTrials);
timeline.push(...blockTrials);
if(block<numReps-1){

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p style="font-size:20px">Ready for the next block? Press the spacebar to continue</p>`,
  choices: [' ']
})

}

}



  var goodbye = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
      <p>Great job! You've completed all the trials!</p>
    `,
    post_trial_gap: 2000
  };

  var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 1000,
  };


  var rtTrial = {
    type: jsPsychImageKeyboardResponse,
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['b', 'l'],
    data: {
        stimType: jsPsych.timelineVariable('stimType')
      }
  }

  var testStims = [
    { stimulus: "img/lion.png", stimType: "lion" },
    { stimulus: "img/badger.png", stimType: "badger"}
  ];

  var expTrials = {
    timeline: [fixation, rtTrial],
    timeline_variables: testStims,
    randomize_order: true,
    repetitions: 3
    
  }

  const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "ptwQJLffXvph",
    filename: filename,
    data_string: ()=>jsPsych.data.get().csv()
  };

  timeline.push({
    type: jsPsychFullscreen,
    fullscreen_mode: false,
    delay_after: 0
  }
  )



// timeline.push(expTrials);
timeline.push(goodbye);
timeline.push(save_data);

jsPsych.run(timeline);

}