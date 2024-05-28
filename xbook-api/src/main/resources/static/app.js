//const stompClient = new StompJs.Client({
//    brokerURL: 'ws://localhost:8080/gs-guide-websocket',
//    connectHeaders: {
//            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE2NTYxNzU2LCJleHAiOjE3MTcxNjY1NTZ9.Nfq9zHweRJlORkrK99UJbBrb8jp2xMhOal2YijyUoSQ'
//    }
//});
//
//stompClient.onConnect = (frame) => {
//    setConnected(true);
//    console.log('Connected: ' + frame);
//    stompClient.subscribe(
//          "/user/" + "john.doe@example.com" + "queue/messages", (greeting) => {
//          console.log(greeting);
//          console.log(greeting.body);
//          showGreeting(JSON.parse(greeting.body).content);
//        }
//        );
////    stompClient.subscribe('/topic/queue/messages', (greeting) => {
////        showGreeting(JSON.parse(greeting.body).content);
////    });
//};
//
//stompClient.onWebSocketError = (error) => {
//    console.error('Error with websocket', error);
//};
//
//stompClient.onStompError = (frame) => {
//    console.error('Broker reported error: ' + frame.headers['message']);
//    console.error('Additional details: ' + frame.body);
//};
//
//function setConnected(connected) {
//    $("#connect").prop("disabled", connected);
//    $("#disconnect").prop("disabled", !connected);
//    if (connected) {
//        $("#conversation").show();
//    }
//    else {
//        $("#conversation").hide();
//    }
//    $("#greetings").html("");
//}
//
//function connect() {
//    stompClient.activate();
//}
//
//function disconnect() {
//    stompClient.deactivate();
//    setConnected(false);
//    console.log("Disconnected");
//}
//
//function sendName() {
//    console.log("sendName function is working!");
//    const headers = {
//        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE2NTYxNzU2LCJleHAiOjE3MTcxNjY1NTZ9.Nfq9zHweRJlORkrK99UJbBrb8jp2xMhOal2YijyUoSQ'
//    };
//    stompClient.publish({
//        destination: "/app/chat",
//        body: JSON.stringify({
////                'name': $("#name").val(),
//                'chatId': 1,
//                'contentType': 'text',
//                'content': $("#name").val()
//                }),
//        headers: headers
//    });
//}
//
//function showGreeting(message) {
//    console.log(message);
//    $("#greetings").append("<tr><td>" + message + "</td></tr>");
//}
//
//$(function () {
//    $("form").on('submit', (e) => e.preventDefault());
//    $( "#connect" ).click(() => connect());
//    $( "#disconnect" ).click(() => disconnect());
//    $( "#send" ).click(() => sendName());
//});










const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket',
    connectHeaders: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE2NTYxNzU2LCJleHAiOjE3MTcxNjY1NTZ9.Nfq9zHweRJlORkrK99UJbBrb8jp2xMhOal2YijyUoSQ'
    }
});

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);

    // Подписка на сообщения
    stompClient.subscribe(
//        "/user/john.doe@example.com/queue/messages", (message) => {
        "/user/alice.smith@example.com/queue/messages", (message) => {
//        "/user/alice.smith@example.com/queue/notification", (message) => {
//        "user/alice.smith@example.com/queue/messageStatus", (message) => {
            console.log("Subscribe is WORKING!!!");
            console.log(message);
            console.log(message.body);
            showGreeting(JSON.parse(message.body).content);
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
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE2NTYxNzU2LCJleHAiOjE3MTcxNjY1NTZ9.Nfq9zHweRJlORkrK99UJbBrb8jp2xMhOal2YijyUoSQ'
    };
    stompClient.publish({
        destination: "/app/chat",
//        destination: "app/updateMessageStatus/1",
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
