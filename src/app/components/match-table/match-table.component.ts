import { Component, OnInit } from '@angular/core';
import { addMatch, deleteMatches, getMatchesMap } from 'src/api/matches';
import { matchesToTableData } from 'src/utils/helpers/matches';
import { MatchTableRow } from 'src/utils/interfaces/matches';

@Component({
  selector: 'match-table-component',
  templateUrl: './match-table.component.html',
  styleUrls: ['./match-table.component.css']
})
export class MatchTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'teams', 'date', 'time', 'result', 'actions'];
  dataSource: MatchTableRow[] = [];
  loading: boolean = true;
  loadingDelete: {[id: string]: boolean} = {}
  loadingAddMatch: boolean = false

  constructor() { }

  async ngOnInit() {
    await this.updateTable()
  }

  updateTable: () => Promise<void> = async () => {
    const [matches, error] = await getMatchesMap()
    const tableData = matchesToTableData(matches)
    this.dataSource = tableData
    if (this.loading) this.loading = false
  }

  deleteMatch: (id: string) => Promise<void> = async (id: string) => {
    this.loadingDelete[id] = true
    const success = await deleteMatches([id])
    if (success) await this.updateTable()
    else alert('Error deleting match')
    this.loadingDelete[id] = false
  }

  addMatch: () => Promise<void> = async () => {
    if (this.loadingAddMatch) return
    this.loadingAddMatch = true
    const success = await addMatch()
    if (success) await this.updateTable()
    else alert('Error adding match')
    this.loadingAddMatch = false
  }
  
}
