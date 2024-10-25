async function startCamera() {
    const video = document.getElementById('video');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch (error) {
        console.error("Camera access denied:", error);
    }
}

document.getElementById("start-auth").addEventListener("click", async () => {
    const video = document.getElementById('video');
    try {
        const snapshot = takeSnapshot(video);
        const response = await fetch('/api/face-recognition', {
            method: 'POST',
            body: snapshot,
            headers: {
                'Content-Type': 'application/octet-stream',
            }
        });
        const result = await response.json();
        if (result.success) {
            alert("Authentication Successful");
        } else {
            alert("Authentication Failed");
        }
    } catch (error) {
        console.error("Authentication error:", error);
    }
});

function takeSnapshot(video) {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    return canvas.toDataURL('image/png');
}

startCamera();
