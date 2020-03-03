


import * as vscode from 'vscode';


export class Coverage
{

    

    private CoverageInPercent : number = 0;
    public GetCoverage() { return this.CoverageInPercent; }

    private LinesExecuted : number = 0;
    public SetLinesExecuted(_lines : number) {this.LinesExecuted = _lines ;}
    
    private LinesNotExecuted : number = 0;
    public SetLinesNotExecuted(_lines : number) {this.LinesNotExecuted = _lines ;}

    constructor () { }

    public Calculate()
    {
        var sum = this.LinesExecuted + this.LinesNotExecuted;
        var Coverage = this.LinesExecuted / sum ;
        this.CoverageInPercent = Coverage * 100;
    }

    public ShowStatusbar(statusbar: vscode.StatusBarItem)
    {
        statusbar.text = "$(tasklist) coverage: " +
                             this.CoverageInPercent.toFixed(2) + " % " +
                             "lines executed: " + this.LinesExecuted + "/" + 
                             (this.LinesNotExecuted + this.LinesExecuted) ;
        statusbar.show();	
    }


    public HideStatusbar(statusbar: vscode.StatusBarItem)
    {
        statusbar.hide();	
    }

}