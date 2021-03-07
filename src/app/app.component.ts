import { Component } from '@angular/core';
import { Paho } from "node_modules/ng2-mqtt/mqttws31";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private _client: Paho.MQTT.Client;
  messages = []
  
  public constructor() {
    this._client = new Paho.MQTT.Client('142.93.210.105',
    Number(9001),
    'lens_uJ4ARU3yLKw9r0Quqhu02dF3yuh');
    
    this._client.onConnectionLost = (responseObject: Object) => {
      console.log('Connection lost.');
    };
    
    this._client.onMessageArrived = (message: Paho.MQTT.Message) => {
      console.log('Message arrived.', message.payloadString);
      this.messages.push(JSON.parse(message.payloadString))
      console.log(this.messages)
      
    };
    
    this._client.connect({ onSuccess: this.onConnected.bind(this) });
  }
  
  private onConnected():void {
    console.log('Connected to broker.');
    this._client.subscribe('70a31ac3-0582-4a60-b8c7-eb8249f9b4fb', '');
  }

}
