document.getElementById('scheduleTab').addEventListener('click', function () {
    document.getElementById('scheduleSection').classList.remove('d-none');
    document.getElementById('statusSection').classList.add('d-none');
    document.getElementById('scheduleTab').classList.add('active');
    document.getElementById('statusTab').classList.remove('active');
    fetchCurrentStatus();  // Fetch status when switching to Schedule tab
});

document.getElementById('statusTab').addEventListener('click', function () {
    document.getElementById('scheduleSection').classList.add('d-none');
    document.getElementById('statusSection').classList.remove('d-none');
    document.getElementById('statusTab').classList.add('active');
    document.getElementById('scheduleTab').classList.remove('active');
    fetchCurrentStatus();
});

document.getElementById('onButton').addEventListener('click', function () {
    showLoading();
    fetch('api/v1/led/on')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateStatus(data.status);
            showSnackbar('LED turned on successfully');
        })
        .catch(error => {
            console.error(error);
            showSnackbar('Error turning on LED');
        })
        .finally(hideLoading);
});

document.getElementById('offButton').addEventListener('click', function () {
    showLoading();
    fetch('api/v1/led/off')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateStatus(data.status);
            showSnackbar('LED turned off successfully');
        })
        .catch(error => {
            console.error(error);
            showSnackbar('Error turning off LED');
        })
        .finally(hideLoading);
});

document.getElementById('sendButton').addEventListener('click', function () {
    const timeOn = document.getElementById('timeOn').value;
    const timeOff = document.getElementById('timeOff').value;
    if (timeOn && timeOff) {
        showLoading();
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
                showSnackbar('Schedule set successfully');
                setTimeout(function () {
                window.location.href = `?ON=${timeOn}&OFF=${timeOff}`;
                }, 2000);
            })
            .catch(error => {
                console.error(error);
                showSnackbar('Error setting schedule');
            })
            .finally(hideLoading);
    } else {
        showSnackbar('Please enter values!');
    }
});

function fetchCurrentStatus() {
    showLoading();
    fetch('api/v1/led/ping')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ON' || data.status === 'OFF') {
                updateStatus(data.status);
            } else {
                updateStatus(data.status + ' [ ' +
                    data.scheduling.time_on_ms + ' ms On, ' + data.scheduling.time_off_ms + ' ms Off ]'
                );
            }
        })
        .catch(error => {
            console.error(error);
            showSnackbar('Error fetching current status');
        })
        .finally(hideLoading);
}

function updateStatus(status) {
    document.getElementById('currentStatus').textContent = `Current Status: ${status}`;
    document.getElementById('scheduleStatus').textContent = `Current Status: ${status}`;
}

function showLoading() {
    document.getElementById('loadingSpinner').classList.remove('d-none');
}

function hideLoading() {
    document.getElementById('loadingSpinner').classList.add('d-none');
}

function showSnackbar(message) {
    var snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.className = "show";
    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}

// Fetch current status when page loads
window.onload = function () {
    fetchCurrentStatus();
    document.getElementById('statusTab').classList.add('active');
    document.getElementById('scheduleTab').classList.remove('active');
    document.getElementById('statusSection').classList.remove('d-none');
    document.getElementById('scheduleSection').classList.add('d-none');
};
