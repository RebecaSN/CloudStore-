import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { SummonerSpell } from 'src/app/core/models/pages/summoner-spells/summonerSpell';
import { SummonerSpellsDataService } from 'src/app/core/services/pages/summoner-spells/summoner-spells-data.service';
import { fadeInOut } from 'src/app/core/services/utilities/animations.service';
import { TableBtn } from '../components/interface/table/table-btn';

@Component({
  selector: 'app-summoner-spells',
  templateUrl: './summoner-spells.component.html',
  styleUrls: ['./summoner-spells.component.scss'],
  animations: [fadeInOut]
})
export class SummonerSpellsComponent implements OnInit {

  displayedColumns: string[] = [
    'index',
    'sku',
    'name',
    'price',
  ];

  dataSource: MatTableDataSource<SummonerSpell>;//alterar a classe para a correta
  isLoadingResults = false;
  buttons: TableBtn[];

  constructor(
    private summonerSpellsDataService: SummonerSpellsDataService,
    private sanitizer: DomSanitizer
  ) {
    this.dataSource = new MatTableDataSource<SummonerSpell>();

    this.buttons = [
      {
        styleClass: 'btn btn-success px-2',
        icon: 'fa-edit',
        iconColor: 'rgb(7, 157, 7)',
        payload: (element: SummonerSpell) => element,
        action: 'edit',
        type: 'btn',
        disable: (element: SummonerSpell) => false,
        permissionMsg: (element: SummonerSpell) => '',
        showHidden: (element: SummonerSpell) => true
      },
      {
        styleClass: 'btn btn-success px-2',
        icon: 'fa-trash',
        iconColor: 'rgb(209, 15, 15)',
        payload: (element: SummonerSpell) => element,
        action: 'delete',
        type: 'btn',
        disable: (element: SummonerSpell) => false,
        permissionMsg: (element: SummonerSpell) => '',
        showHidden: (element: SummonerSpell) => true
      },
      {
        styleClass: 'btn btn-success px-2',
        icon: 'fa-eye',
        payload: (element: SummonerSpell) => element,
        action: 'view',
        type: 'btn',
        disable: (element: SummonerSpell) => false,
        permissionMsg: (element: SummonerSpell) => '',
        showHidden: (element: SummonerSpell) => true
      },
    ];
  }

  ngOnInit() {
    this.loadDataSource();
  }

  loadDataSource():void{
    // this.summonerSpellsDataService.getAllSummoresSpells().subscribe(
    //   (data: any) => {
    //     // this.summonersList = Object.values(data.data);
    //   }
    // );
  }

  add():void{

  }

}
