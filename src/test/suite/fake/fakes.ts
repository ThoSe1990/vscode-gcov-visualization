
import * as vscode from 'vscode';

class FakeTextLine implements vscode.TextLine
{
    lineNumber!: number;    
    text!: string;
    range!: vscode.Range;
    rangeIncludingLineBreak!: vscode.Range;
    firstNonWhitespaceCharacterIndex!: number;
    isEmptyOrWhitespace!: boolean;

}

class FakeTextDocument implements vscode.TextDocument 
{
    uri: vscode.Uri = vscode.Uri.parse(vscode.workspace.workspaceFolders![0].uri.fsPath + "\\src\\noGcovFile.cpp");		
    fileName: string = this.uri.fsPath;
    isUntitled!: boolean;
    languageId!: string;
    version!: number;
    isDirty!: boolean;
    isClosed!: boolean;
    save(): Thenable<boolean> {
        throw new Error("Method not implemented.");
    }
    eol: vscode.EndOfLine = 1;
    lineCount!: number;
    lineAt(line: number): vscode.TextLine;
    lineAt(position: vscode.Position): vscode.TextLine;
    lineAt(position: any) {
        return new FakeTextLine();
        //throw new Error("Method not implemented.");
    }
    offsetAt(position: vscode.Position): number {
        throw new Error("Method not implemented.");
    }
    positionAt(offset: number): vscode.Position {
        throw new Error("Method not implemented.");
    }
    getText(range?: vscode.Range | undefined): string {
        throw new Error("Method not implemented.");
    }
    getWordRangeAtPosition(position: vscode.Position, regex?: RegExp | undefined): vscode.Range | undefined {
        throw new Error("Method not implemented.");
    }
    validateRange(range: vscode.Range): vscode.Range {
        throw new Error("Method not implemented.");
    }
    validatePosition(position: vscode.Position): vscode.Position {
        throw new Error("Method not implemented.");
    }   
}

export class FakeEditor implements vscode.TextEditor 
{
    document: vscode.TextDocument = new FakeTextDocument();
    selection!: vscode.Selection;
    selections!: vscode.Selection[];
    visibleRanges!: vscode.Range[];
    options!: vscode.TextEditorOptions;
    viewColumn?: vscode.ViewColumn | undefined;

    constructor()
    {

    }

    edit(callback: (editBuilder: vscode.TextEditorEdit) => void, options?: { undoStopBefore: boolean; undoStopAfter: boolean; } | undefined): Thenable<boolean> {
        throw new Error("Method not implemented.");
    }
    insertSnippet(snippet: vscode.SnippetString, location?: vscode.Range | vscode.Position | readonly vscode.Position[] | readonly vscode.Range[] | undefined, options?: { undoStopBefore: boolean; undoStopAfter: boolean; } | undefined): Thenable<boolean> {
        throw new Error("Method not implemented.");
    }
    setDecorations(decorationType: vscode.TextEditorDecorationType, rangesOrOptions: vscode.Range[] | vscode.DecorationOptions[]): void {
        throw new Error("Method not implemented.");
    }
    revealRange(range: vscode.Range, revealType?: vscode.TextEditorRevealType | undefined): void {
        throw new Error("Method not implemented.");
    }
    show(column?: vscode.ViewColumn | undefined): void {
        throw new Error("Method not implemented.");
    }
    hide(): void {
        throw new Error("Method not implemented.");
    }
}


