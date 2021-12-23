song1 = "";
song2 = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";
leftWristx = 0;
leftWristy = 0; 
rightWristx = 0;
rightWristy = 0;
function preload()
{
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}
function setup()
{
 canvas = createCanvas(600, 500);
 canvas.position(460, 200);
 video = createCapture(VIDEO);
 video.hide();
 poseNet = ml5.poseNet(video, modelLoaded);
 poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log("Pose Net is initilized");
}
function draw()
{
 image(video, 0, 0, 600, 500);
 fill('#FF0000');
stroke('#000000');
song1_status = song1.isPlaying()
song2_status = song2.isPlaying()
if (scoreLeftWrist > 0.2) 
{
    circle(leftWristx, leftWristy, 20);
    song2.stop()
    if (song1_status == false) 
    {
        song1.play();
        document.getElementById("Song").innerHTML = "Song 1 is playing";
    }
}
if (scoreRightWrist > 0.2) 
{
    circle(rightWristx, rightWristy, 20);
    song1.stop()
    if (song2_status == false) 
    {
        song2.play();
        document.getElementById("Song").innerHTML = "Song 2 is playing";
    }
}
}

function gotPoses(results)
{
    if (results.length > 0) 
    {
    console.log(results); 
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("Right wrist score - " + scoreRightWrist + "Left wrist score - " + scoreLeftWrist);   
    leftWristx = results[0].pose.leftWrist.x;
    leftWristy = results[0].pose.leftWrist.y;
    console.log("Left wrist x = " + leftWristx + "Left wrist y = " + leftWristy);
    rightWristx = results[0].pose.rightWrist.x;
    rightWristy = results[0].pose.rightWrist.y;
    console.log("Right wrist x = " + rightWristx + "Right Wrist y = " + rightWristy);
    }
}