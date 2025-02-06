# node-red-contrib-mqtt-auto: FORK of [node-red-contrib-mqtt-auto](https://github.com/eltonssilva/node-red-contrib-mqtt-auto) to integrate fixes

This node is intended to facilitate connection and change of connection credentials at runtime.

## mqtt-auto-connect

<img src="img/connects.png" width="200" alt="Conectar">

```
msg.payload = {

  "client_id": "clientid",
  "host": "locahost",
  "user": "user",
  "password": "password",
  "reconnect_t" : 1, // 0 No Reconect  1 AutoReconnect
};
```


### mqtt-auto-disconnect

<img src="img/disconnect.png" width="200" alt="Conectar">


```
msg.client_id = "client_id";
```

### mqtt-auto-status

<img src="img/status.png" width="200" alt="Conectar">



### mqtt-auto-subscribe

<img src="img/subscribe.png" width="200" alt="Conectar">


```
msg.client_id = "client_id";
msg.topic = "topic";
```


### mqtt-auto-unsubscribe

<img src="img/unsubscribe.png" width="200" alt="Conectar">

```
msg.client_id = "client_id";
msg.topic = "topic";
```

### mqtt-auto-publish

<img src="img/publish.png" width="200" alt="Conectar">

```
msg.client_id = "client_id";
msg.paydload = "my_message";
msg.topic = "topic";
msg.options={}; # 
```
See [Mqtt documentation](https://github.com/mqttjs/MQTT.js?tab=readme-ov-file#mqttclientpublishtopic-message-options-callback)
