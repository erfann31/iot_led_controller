document.getElementById('onButton').addEventListener('click', function () {
    fetch('api/v1/led/on')
        .then(response => response.json())
        .then(data => console.log(data));
});

document.getElementById('offButton').addEventListener('click', function () {
    fetch('api/v1/led/off')
        .then(response => response.json())
        .then(data => console.log(data));
});

document.getElementById('sendButton').addEventListener('click', function () {
    const timeOn = document.getElementById('timeOn').value;
    const timeOff = document.getElementById('timeOff').value;
    if (timeOn && timeOff) {
        fetch('api/v1/led/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ time_on_ms: timeOn, time_off_ms: timeOff })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.href = `?ON=${timeOn}&OFF=${timeOff}`;
            });
    } else {
        alert('Please enter both ON and OFF times');
    }
});
