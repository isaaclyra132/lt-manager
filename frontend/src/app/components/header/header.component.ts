import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private deviceDetectorService: DeviceDetectorService) {}

  get isMobile() {
    return this.deviceDetectorService.isMobile();
  }
}
