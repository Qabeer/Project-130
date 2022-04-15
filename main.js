song_1 = "";
song_2 = "";

leftWristX = 0;
rightWristX = 0;

leftWristY = 0;
rightWristY = 0;

ScoreLeftWrist = 0;
ScoreRightWrist = 0;

song_1_status = "";
song_2_status = "";

function preload() {
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded!!!");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    song_1_status = song_1.isPlaying();
    if(ScoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song_2.stop();

        if(song_1_status == false) {
            song_1.play();
            document.getElementById("song").innerHTML = "Playing Harry Potter Theme";
        }
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of Left Wrist = " + ScoreLeftWrist + ", Score of Right Wrist = " + ScoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        console.log("Left Wrist X = " + leftWristX + ", Right Wrist X = " + rightWristX);

        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist Y = " + leftWristY + ", Right Wrist Y = " + rightWristY); 
    }
}