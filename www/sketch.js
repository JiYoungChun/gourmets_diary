    //face tracking and emotion detection

    var ctracker;
    var ec;
    var happyVal = 0;
    var sadVal = 0;
    var isFaceTracking = false;

    function setup() {
        // setup camera capture
        var videoInput = createCapture();
        videoInput.size(100, 100);
        videoInput.position(0, 0);
        videoInput.hide();

        ec = new emotionClassifier();
        ec.init(emotionModel);
        var emotionData = ec.getBlank();


        // setup canvas
        var cnv = createCanvas(100, 100);
        cnv.position(0, 0);
        // setup tracker
        ctracker = new clm.tracker();
        ctracker.init(pModel);
        ctracker.start(videoInput.elt);
        noStroke();
    }

    function draw() {
        if (isFaceTracking) {
            var cp = ctracker.getCurrentParameters();
            var er = ec.meanPredict(cp);
            //I don't think I need it
            var emotions = ec.getEmotions();
            clear();



            if (er) {
                happyVal = er[3].value;
                // sadVal= er[1].value;
            }

            // console.log("happy:"+happyVal);
            // console.log("sad:"+sadVal);


            // get array of face marker positions [x, y] format
            var positions = ctracker.getCurrentPosition();

            for (var i = 0; i < positions.length; i++) {
                // set the color of the ellipse based on position on screen
                fill(211, 0, 13);
                // draw ellipse at each position point
                ellipse(positions[i][0], positions[i][1], 2, 2);
            }
        }
    }