import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private net;
  public predictionList;
  @ViewChild('myImage', {static: true}) myImage: ElementRef;
  async ngAfterViewInit() {
    this.net = await mobilenet.load();
    console.log('The model has been loaded');
    const imgEl = this.myImage.nativeElement;
    this.predictionList = await this.net.classify(imgEl);
    console.log(this.predictionList)
  }
}
