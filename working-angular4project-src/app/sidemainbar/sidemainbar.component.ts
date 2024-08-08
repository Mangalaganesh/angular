import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidemainbar',
  templateUrl: './sidemainbar.component.html',
  styleUrls: ['./sidemainbar.component.css']
})
export class SidemainbarComponent {

  constructor(
    private route: ActivatedRoute,
  ) { }

}
