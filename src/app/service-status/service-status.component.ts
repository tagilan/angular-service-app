import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.component.html',
  styleUrls: ['./service-status.component.scss']
})
export class ServiceStatusComponent implements OnInit {
  @ViewChild('myTable') table: any;
  @ViewChild('subTable') subTable: any;

  rows: any[] = [];
  expanded: any = {};
  timeout: any;
  apiData: any;
  userRegion: string = "Indian Sub-Continent";
  extraRows: any = [{
    "apiName": "Rate Express",
    "status": "Operational",
    "upTime": "98%",
    "avgResponseTime": "160ms"
  },
  {
    "apiName": "Rate Freight",
    "status": "Operational",
    "upTime": "98%",
    "avgResponseTime": "160ms"
  },
  {
    "apiName": "Rate Ground",
    "status": "Operational",
    "upTime": "98%",
    "avgResponseTime": "160ms"
  },
  {
    "apiName": "Rate SmartPost",
    "status": "Operational",
    "upTime": "98%",
    "avgResponseTime": "160ms"
  }]

  constructor() {
    this.fetch((data: any) => {
      console.log(data);
      this.apiData = data;
      this.computeRegionData(this.apiData, this.userRegion);
    });
  }

  computeRegionData(apiData: any, region: string) {
    const { list } = apiData?.output;
    var apiData = list.find((item: any) => item.region == region);
    this.rows = apiData?.apis
  }

  fetch(cb: any) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/api.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  isSubApisPresent(row: any) {
    switch (row.apiName) {
      case "Rate":
        return row.rateSubApis ? true : false
      case "Ship":
        return row.shipSubApis ? true : false
      default:
        return false
        break;
    }
  }

  getSubTableRows(row: any) {
    switch (row.value?.apiName) {
      case "Rate":
        return row.value?.rateSubApis
      case "Ship":
        return row.value?.shipSubApis
      default:
        return []
        break;
    }
  }

  toggleExpandRow(row: any) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event: any) {
    console.log(event);
  }

  ngOnInit() { }
}
