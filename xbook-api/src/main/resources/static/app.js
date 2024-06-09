const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/websocket',
    connectHeaders: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE3ODY3NTUzLCJleHAiOjE3MTg0NzIzNTN9.nol3a48eamSl8z-_EMCv0ADPJwQaJV5BHHHNPw16tmM'
    }
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);

    // Подписка на сообщения
    stompClient.subscribe(
//        "/user/john.doe@example.com/queue/messages", (message) => {
        "/user/alice.smith@example.com/queue/messages", (message) => {
//        "/user/alice.smith@example.com/queue/message-notification", (message) => {
//        "/user/alice.smith@example.com/queue/message-status", (message) => {
//        "/user/1/topic/notifications", (message) => {
            console.log("Subscribe is WORKING!!!");
            console.log(message);
            console.log(message.body);
//            showGreeting(JSON.parse(message.body).content);
        }
    );
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    } else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    console.log("sendName function is working!");
    const headers = {
//    Token of user 'john.doe@example.com'
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE3ODY3NTUzLCJleHAiOjE3MTg0NzIzNTN9.nol3a48eamSl8z-_EMCv0ADPJwQaJV5BHHHNPw16tmM'
    };
    stompClient.publish({
        destination: "/app/chat",
//        destination: "/app/update-message-status/3",
//        destination: "/app/update-message-status/3",
        body: JSON.stringify({
            'chatId': 1,
            'contentType': 'text',
            'content': $("#name").val()
        }),
//        body: JSON.stringify('READ'),
        headers: headers
    });
}

function showGreeting(message) {
    console.log(message);
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $("#connect").click(() => connect());
    $("#disconnect").click(() => disconnect());
    $("#send").click(() => sendName());
});