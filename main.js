leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

leftWrist_score = 0;
rightWrist_score = 0;
song1status = "";
song2status = "";

function setup()
{
    Canvas = createCanvas(600,500);
    Canvas.center();
    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on("pose", gotposes);

}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    song1status = song1.isPlaying()
    song2status = song2.isPlaying()
    if(leftWrist_score > 0.2)
    {
        circle(leftWristX, leftWristY, 40);
        song2.stop()
        if (song1status == false) 
        {
            song1.play();
            document.getElementById("song_name").innerHTML = " World smallest violin";
        }
    }

    if (rightWrist_score > 0.2) 
    {
        circle(rightWristX, rightWristY, 40);
        song1.stop();
        if (song2status == false) 
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "i ain't worried is playing";
        }
    }


}

function preload()
{
    song1 = loadSound("WSV.mp3");
    song2 = loadSound("topgun.mp3");
}

function play()
{
    song2.play();
}

function stop()
{
    song2.stop();
    song1.stop();
}

function modelReady()
{
    console.log("model is ready");
}

function gotposes(results)
{
    if(results.length > 0)
    {
    console.log(results)

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;

    leftWrist_score = results[0].pose.keypoints[9].score;
    rightWrist_score = results[0].pose.keypoints[10].score;
    }
}

