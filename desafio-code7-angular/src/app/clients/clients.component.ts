import { Component, OnInit } from '@angular/core';
import { Client } from 'model/client';
import {  ToastrService } from 'ngx-toastr';
import { ClientProvider } from 'providers/client';
import 'rxjs/add/operator/debounceTime';


declare const google: any;


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Array<Client> = [];
  loadingClients: boolean = false;
  loadingMap: boolean = false;
  constructor(
    public clientProvider: ClientProvider,
    public toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.getClients();
  }

  initMapToClient(client){
    
    this.loadingMap = true;
    var myLatlng = new google.maps.LatLng(Number(client.address.geo.lat), Number(client.address.geo.lng));
      var mapOptions = {
          zoom: 2,
          center: myLatlng,
          scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      };
      var map = new google.maps.Map(document.getElementById("map-"+client.id), mapOptions);
      
      var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Endereço de "+client.name
      });
      marker.setMap(map);
      this.loadingMap = false;
  


  
  }
  

  getClients(){
    this.loadingClients = true;
    this.clientProvider.getClients()
    .then(resp=>{
      console.log(resp);
      
      if(resp['success']==true){
          this.clients = resp['data'];

      }else if(resp['success']== false){
          this.toastr.warning(resp['data']['message']);
          throw(resp);
      }           
    }).catch( error => {
        console.log('erro: ' +  error);
        this.toastr.error('Erro ao se comunicar com o servidor', 'Ops!')       
    })
    .then(()=>this.loadingClients=false)
  }
}
