
import * as vscode from 'vscode';

var path = require('path')
var fs = require('fs');



export class FileHandler
{
    private readonly GCOV_FILE_EXTENSION = '.gcov';

    private GcovFilePaths : string[] = [];  
    public GetGcovFiles() { return this.GcovFilePaths; }

	constructor () {}

	public GetAllGcovFilesFromWorkspace(inPath: string | undefined) 
	{ 
        console.log("check dir: " + __dirname);

        console.log("looking for files in " + inPath);
        if (!fs.existsSync(inPath))
        {
            console.log("no dir ",inPath);
            return ;
        }

        var files=fs.readdirSync(inPath);

        this.FindFilesRecursively(files, inPath);       
    }
    
    public FindGcovFile(textEditor : vscode.TextEditor | undefined)
    {
        if (textEditor)
        {            
            var openFile = textEditor.document.fileName;
            var consideredFiles = this.FindAllFilesWithSameName(openFile);
            return this.GetGcovFile(consideredFiles, openFile);
        }
    }

    private FindAllFilesWithSameName(openFile : string)
    {
        var file = this.GetFilename(openFile);
        var consideredFiles = [];
        for (var i = 0 ; i < this.GcovFilePaths.length ; i++)
        {
            if (this.GcovFilePaths[i].indexOf(file!) !== -1)
                consideredFiles.push(this.GcovFilePaths[i]);
        }
        return consideredFiles;
    }
    private GetGcovFile (gcovFiles : string [], openFile : string)
    {
        var openFileLowerCase = openFile.toLowerCase();
        
        for (var i = 0 ; i < gcovFiles.length ; i++ )
        {
            var filename = this.ExtractSrcNameFromGcovContent(gcovFiles[i]);
            var desiredFile = this.RemoveLineBreaksAndRelativePath(filename);

            if (openFileLowerCase.includes(desiredFile))
                return gcovFiles[i] ;
        }
    } 

    private GetFilename (file : string)
    {
        var temp = file.replace(/\//g, '\\');
        return temp.split('\\').pop();
    }

    private ExtractSrcNameFromGcovContent(gcovFile : string)
    {
        var content = fs.readFileSync(gcovFile).toString();
        var firstLine = content.substring(0, content.indexOf('\n')).toLowerCase();
        var extractedFilename = firstLine.split('source:').pop();
        
        return extractedFilename;
    }
    private RemoveLineBreaksAndRelativePath(path : string)
    {
        var removeLinebreak = path.replace(/(\r\n|\n|\r)/gm, "");
        var onlyBackslash = removeLinebreak.replace(/\//g, '\\');
        var replaceDotsAndSlash = onlyBackslash.replace(/\.\.\\/g, '');

        return replaceDotsAndSlash;
    }


    private FindFilesRecursively(files: string | any[], inPath: any)
    {
        for( var i = 0 ; i < files.length ; i++ )
        {
            var filename = path.join(inPath,files[i]);
            this.CheckFilename(filename);
        };
    }

    private CheckFilename(filename: any | string[])
    {
            if ( fs.lstatSync(filename).isDirectory() )
            {
                this.GetAllGcovFilesFromWorkspace(filename);
            }
            else if (filename.indexOf(this.GCOV_FILE_EXTENSION) >=0 ) 
            {
                this.AddGcovFile(filename);
            };
    }

    private AddGcovFile(file : string)
    {
        if ( this.GcovFilePaths.includes(file) )
            return ;
        this.GcovFilePaths.push(file);
    } 

}



