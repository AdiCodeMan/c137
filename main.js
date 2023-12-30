status="";
video = "";
objects = [];
object_name="";

var utterThis;

function setup()
{
    canvas = createCanvas(450, 320);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
}
  

function begin()
{
    object_name=document.getElementById("objectname").value;
    console.log(object_name);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("number_of_objects").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded")
    status = true;
}

function draw()
{
    image(video, 0, 0, 450, 320);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i=0; i < objects.length; i++)
        {

            document.getElementById("number_of_objects").innerHTML = "Number of objects detected :"+objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == object_name){
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = object_name + " found";
                
                var synth = window.speechSynthesis;
                speak_data = object_name + " found";
                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
                video.LiveView.stop()
               }else{
                document.getElementById("status").innerHTML = object_name + " not found";

                var synth = window.speechSynthesis;
                speak_data = object_name + " not found";
                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
                video.LiveView.stop()
               }
        }
    }
}

function gotResult(error, results)
{
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}