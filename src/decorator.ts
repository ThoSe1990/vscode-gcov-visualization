

import * as vscode from 'vscode';

var fs = require('fs');



const LIGHT_RED = '#c8282850';
const LIGHT_GREEN = '#2F853550';


const COLORS = [ LIGHT_RED,
                LIGHT_GREEN ];


export class DecoratorHandler
{   

    private Container : internal_Decoration[] = [];

    private State : Boolean;

    constructor () 
    {
        console.log("creating deco handler");
        this.State = false;
    }

    public GetState() { return this.State; }
    public SetState(state : Boolean) { this.State = state; }

    public GetNoOfDecorators() { return this.Container.length;}

    public AddDecorator(textEditor : vscode.TextEditor , gcovFile : string )
    {
        for (var i = 0 ; i < COLORS.length ; i++)
        {
            if (this.NewDecorator(textEditor, COLORS[i]))
            {
                var factory = new DecoratorFactory();
                var container = factory.Create(textEditor, gcovFile, COLORS[i]);
                if (container)
                    this.Container.push(container);
            }
        }
          
    }

    private NoGcovFile(textEditor : vscode.TextEditor , gcovFiles : any)
    {
        var path = textEditor.document.fileName;
        var file = path.substring(path.lastIndexOf('\\')+1);

        for (var i = 0 ; i < gcovFiles.length ; i++ )
        {
            if (gcovFiles[i].toString().indexOf(file) !== -1)
                return gcovFiles[i];
        }
        return '';
    }

    public GetDecorator(textEditor : vscode.TextEditor)
    {
        var AllDecoraitors = new Array(); 

        for (var i = 0 ; i < this.Container.length ; i++)
        {
            if (textEditor === this.Container[i].GetTextEditor())
                AllDecoraitors.push(this.Container[i]);
        }
        return AllDecoraitors;
    }

    private NewDecorator(textEditor : vscode.TextEditor, color : string)
    {
        for (var i = 0 ; i < this.Container.length ; i++)
        {
            if (textEditor === this.Container[i].GetTextEditor() && color === this.Container[i].GetColor() ) 
            {
                return false;
            }
        }
        return true;
    }


}


class DecoratorFactory
{
    constructor () {}

    public Create (textEditor : vscode.TextEditor, gcovFile : string, color : string) 
    {
        if (color === LIGHT_GREEN)
        {
            return new GreenDecorator(textEditor, gcovFile, color);
        }
        else if (color === LIGHT_RED)
        {
            return new RedDecorator(textEditor, gcovFile, color);
        }
    }
}



class internal_Decoration
{
    protected Decoration: vscode.TextEditorDecorationType;
    protected DecoratorContainer: vscode.DecorationOptions[];
    protected TextEditor : vscode.TextEditor;

    private SrcContent : string[];
    private GcovContent : string[];

    private Color : string;

    // Expression for Gcov Line <NO OF EXECUTION> : <ROW NUMBER IN SOURCE> : <ROW CONTENT>
    // literally: "some spaces and digits" : "some spaces and digits" : "any content to end of line"
    private GCOV_REGEXP : RegExp = new RegExp('^[\\s\\d(\\*)?]*:[\\s\\d]*:.*');

    constructor ( textEditor : vscode.TextEditor , gcovfile : string, color : string) 
    {
        this.Color = color;

        this.TextEditor = textEditor; 

        this.SrcContent = fs.readFileSync(textEditor.document.fileName).toString().split("\n");
        this.GcovContent = fs.readFileSync(gcovfile).toString().split("\n");

        this.Decoration = vscode.window.createTextEditorDecorationType({  });

        this.DecoratorContainer = [];
    }

    public GetTextEditor() { return this.TextEditor; }
    
    public GetColor() { return this.Color; }

    public Reset()
    {
        if (this.Decoration)
            this.Decoration.dispose();
    }

    public SetDecoration()
    {
        this.ParseGcovContentAndCreateDecoration();        
        this.DisplayDecorations();
    }

    private ParseGcovContentAndCreateDecoration()
    {
        for (var i = 0 ; i < this.GcovContent.length ; i++)
        {
            var gcovLine = this.GetValidLineContent(this.GcovContent[i]);
            var gcovContent = this.GetGcovContent(gcovLine);
            if (gcovContent !== undefined)
                this.CreateDecoration(gcovContent.executedCount , gcovContent.row);
        }
    }

    private GetGcovContent(gcovLine : string[] | undefined)
    {
        if (gcovLine === undefined)
            return;
            
        var executedCount = gcovLine[0];
        var row = parseInt(gcovLine[1]) - 1; // fileread starts at 0
        var content = gcovLine[2]

        if (this.SrcContent[row].indexOf(content) !== -1)
            return {executedCount, row};            
    }

    private GetValidLineContent(gcovLine : string)
    {
        var match = gcovLine.toString().match(this.GCOV_REGEXP);
        
        if (match)
        {
            var splittedLine = match.toString().split(':');
            var execution = splittedLine[0].replace('*','');
            var rowNumber = splittedLine[1];
            // drop first two elements and join again with colon in case of colons within the content (colons are dropped by split)
            var content = splittedLine.slice(2).join(':');

            return [
                execution.toString().trim(),
                rowNumber.toString().trim(),
                content
            ];
            
        }
    }


    protected GetPositions(row : number )
    {
        var startPosition = new vscode.Position(row, 0); 
        var endPosition = new vscode.Position(row, Number.MAX_VALUE);
        return new vscode.Range(startPosition, endPosition);
    }


    protected PushDecoration(positions: vscode.Range, hovermessage: string)
    {
        var decoration = { range: positions, hoverMessage: hovermessage };

        for (var i = 0 ; i < this.DecoratorContainer.length ; i++)
        {
            if (this.DecoratorContainer[i].range.start.line === decoration.range.start.line)
                return;
        }

        if (decoration)
        {  
            this.DecoratorContainer.push(decoration);
        }
    }

    protected CreateDecoration(lineExecutionInformation : string, row : number){ }
    protected DisplayDecorations() {}
    protected CreateHoverMessage(lineExecutionInformation : any) 
    {
        //default message, can be overwritten
        return "line executed " + lineExecutionInformation + " times";
    }
}





export class RedDecorator extends internal_Decoration
{
    constructor ( textEditor : vscode.TextEditor , gcovfile : string, color : string ) 
    {
        super(textEditor, gcovfile, color);
    }


    public CreateDecoration( lineExecutionInformation : string, row : number)
    {
        var numberOfCalls = parseInt(lineExecutionInformation.toString());
        if (isNaN(numberOfCalls))
            return;
        
        if (numberOfCalls === 0)
        {
            var positions = super.GetPositions(row);
            var hovermessage = this.CreateHoverMessage(numberOfCalls);
            super.PushDecoration(positions, hovermessage);
        }
    }

    public DisplayDecorations()
    {
        this.Decoration = vscode.window.createTextEditorDecorationType({ backgroundColor: LIGHT_RED });
        this.TextEditor.setDecorations(this.Decoration,this.DecoratorContainer);
    }

}


export class GreenDecorator extends internal_Decoration
{

    constructor ( textEditor : vscode.TextEditor , gcovfile : string, color : string) 
    {
        super(textEditor, gcovfile, color);
    }

    public CreateDecoration( lineExecutionInformation : string, row : number)
    {
        var numberOfCalls = parseInt(lineExecutionInformation.toString());
        if (isNaN(numberOfCalls))
            return;
        
        if (numberOfCalls > 0)
        {
            var positions = super.GetPositions(row);
            var hovermessage = this.CreateHoverMessage(numberOfCalls);
            super.PushDecoration(positions, hovermessage);
        }
    }

    public DisplayDecorations()
    {
        this.Decoration = vscode.window.createTextEditorDecorationType({ backgroundColor: LIGHT_GREEN });
        this.TextEditor.setDecorations(this.Decoration,this.DecoratorContainer);
    }
} 