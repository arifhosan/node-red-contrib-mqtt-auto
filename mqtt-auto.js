'use strict';

const DynMQTT = require("./DynMQTT.js");
const { destr } = require("destr");
const main = function (RED) {

    // =========== Connection manager ===========
    RED.nodes.registerType("mqtt-auto-connect", function (config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('close', function (done) {
            DynMQTT.closeClients();
            done();
        });
        node.on('input', function (msg, send, done) {
            DynMQTT.createClient(msg, function (new_status) {
                node.status(new_status.summary);
                node.send(new_status)
            })
            done();
        });
    });

    RED.nodes.registerType("mqtt-auto-disconnect", function (config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg, send, done) {
            let result = DynMQTT.closeClient(msg.client_id)
            if (result) {
                done();
            } else {
                done("Client not found!");
            }
        });
    });


    // =========== Publisher ===========
    RED.nodes.registerType("mqtt-auto-publish", function (config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', async function (msg, send, done) {
            let client = DynMQTT.getClient(msg.client_id);
            let options = msg.options || {};
            if (client && await client.publish(msg.topic, msg.payload, options)) {
                done();
            }
            else {
                node.warn("Client not known or not connected - sending msg back for re-looping");
                send(msg);
                done();
            }
        })
    });


    // =========== Subscriber ===========
    RED.nodes.registerType("mqtt-auto-subscribe", function (config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', async function (msg, send, done) {
            let client = DynMQTT.getClient(msg.client_id);
            if (client) {
                let topics = [msg.topic].flat()
                for (let t of topics) {
                    // -- actualTopic contains the real topic the message was received at (no wildards)
                    await client.subscribe(t, function (actualTopic, message) {
                        send({
                            "payload": destr(message.toString()),
                            "client_id": client.client_id,
                            "topic": actualTopic
                        })
                    })
                }
                done();
            } else
                done("Client " + msg.client_id + " for Subsription not known!");
        });
    });

    RED.nodes.registerType("mqtt-auto-unsubscribe", function (config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', async function (msg, send, done) {
            let client = DynMQTT.getClient(msg.client_id);
            if (client && await client.unsubscribe(msg.topic)) {
                done();
            } else
                done("Client " + msg.client_id + " for Un-Subsription not known!");
        });
    });

    // =========== Status ===========
    RED.nodes.registerType("mqtt-auto-status", function (config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg, send, done) {
            send({ "payload": DynMQTT.listClients() })
            done();
        });
    });
}

module.exports = main;