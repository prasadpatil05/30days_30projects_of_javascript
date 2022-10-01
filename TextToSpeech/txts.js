const textarea= document.querySelector('#text');
let voicelist= document.querySelector('#voice');
let btn= document.querySelector('.btns');
let synth= speechSynthesis;
let isSpeaking= true

function speak(){

          for(let voice of synth.getVoices()){
            let option=document.createElement('option');
            option.text=voice.name;
            voicelist.add(option);
            console.log(option)
          }
}
synth.addEventListener('voiceschanged',speak);
function texttospeech(text){
    let utterance= new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name==voicelist.value){
            utterance.voice=voice;
        }
    }
    speechSynthesis.speak(utterance)
}

btn.addEventListener('click',(e)=>{
          e.preventDefault();
          if (textarea.value!==''){
            if(!synth.speaking){
                texttospeech(textarea.value);
            }
          if(textarea.value.length>80){
            if(isSpeaking){
                synth.resume();
                isSpeaking=false;
                btn.innerHTML='pause'
            }
            else{
                synth.pause()
                isSpeaking=true;
                btn.innerHTML='resume'

            }
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking=true;
                    btn.innerHTML='speak'

                }
          })
        }
        else{
            btn.innerHTML='Speak'
        }
        }
    })
    