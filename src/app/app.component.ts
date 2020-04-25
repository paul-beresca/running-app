import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private net;
  public predictionObject;
  private classifier = knnClassifier.create();
  private webcamDevice;

  @ViewChild('myWebcam', {static: true}) webcam: ElementRef;

  async ngAfterViewInit() {
    this.net = await mobilenet.load();
    console.log('The model has been loaded');
    const webcamElement = this.webcam.nativeElement;
    this.webcamDevice = await tf.data.webcam(webcamElement);
    while (true) {
      if (this.classifier.getNumClasses() > 0) {
        const imgEl = await this.webcamDevice.capture();
        const activation =this.net.infer(imgEl, 'conv_preds');
        this.predictionObject = await this.classifier.predictClass(activation);
        let event;
        switch(this.predictionObject.label) {
          case 'left':
            event = new CustomEvent('moveControl', {detail: 37});
            window.dispatchEvent(event);
          break;
          case 'right':
            event = new CustomEvent('moveControl', {detail: 39});
            window.dispatchEvent(event);
          break;
          case 'shoot':
            event = new CustomEvent('moveControl', {detail: 32});
            window.dispatchEvent(event);
          break;
          case 'nothing':
          break;
        }
        imgEl.dispose();
      }
      await tf.nextFrame();
    }
  }

  async addExample(classId) {
    const img = await this.webcamDevice.capture();
    const activation = this.net.infer(img, true);
    this.classifier.addExample(activation, classId);
    img.dispose();
  }
}
