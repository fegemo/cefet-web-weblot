let stream;
let recorder;
(
    window.onload = async () => {
        if (!navigator.getUserMedia) {
            alert('Navegador não tem suporte a UserMedia')
            return
        }
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        document.querySelector('#webcamVideo').srcObject  = stream;
        
        startRecording = (e) => {
            recorder = new MediaRecorder(stream);
            recorder.addEventListener('dataavailable', (event) => {
                document.querySelector('#savedVideo').src  = URL.createObjectURL(event.data);
            });
            recorder.start();
            document.querySelector('#recordButton').disabled = true
            document.querySelector('#stopButton').disabled = false
        }

        stopRecording = async () => {
            recorder.stop();
            document.querySelector('#recordButton').disabled = false
            document.querySelector('#stopButton').disabled = true
        }
    }
)()