import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.component.html',
  styleUrls: ['./service-status.component.scss']
})
export class ServiceStatusComponent implements OnInit {
  @ViewChild('myTable') table: any;
  @ViewChild('subTable') subTable: any;
  selected = 'option2';

  rows: any[] = [];
  expanded: any = {};
  timeout: any;
  apiData: any;
  userRegion: string = "Indian Sub-Continent";
  country: string = "";
  lastUpdated: any = new Date();

  regions = [
    { name: 'Americas and Caribbean' },
    { name: 'Asia Pacific' },
    { name: 'Europe' },
    { name: 'Indian Sub-Continent' },
    { name: 'Middle East' },
    { name: 'Africa' },
  ];


  constructor() {
    this.fetch((data: any) => {
      console.log(data);
      this.apiData = data;
      this.country = data?.country
      this.computeRegionData(this.apiData, this.userRegion);
    });
  }

  onRegionChange(event: any) {
    this.computeRegionData(this.apiData, event);
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
    switch (row.apiName) {
      case "Rate":
        return row.rateSubApis
      case "Ship":
        return row.shipSubApis
      default:
        return []
        break;
    }
  }

  toggleExpandRow(row: any) {
    this.table.rowDetail.toggleExpandRow(row);
    var rows = this.getSubTableRows(row)
    this.table.rowDetail.rowHeight = rows.length * 50 + 20
  }

  getStatusImage(status: string) {
    switch (status) {
      case "Operational":
        return "/assets/images/check.png"
      case "Outage":
        return "/assets/images/cancel.png"
      case "Incident":
        return "/assets/images/caution.png"
      default:
        return "";
    }
  }

  onDetailToggle(event: any) { }

  ngOnInit() { }
}
