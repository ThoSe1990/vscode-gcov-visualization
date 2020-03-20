
import * as vscode from 'vscode';

var path = require('path')
var fs = require('fs');



export class FileHandler
{
    public readonly FILE_EXTENSION : string;

    protected AllFiles : string[] = [];  
    public GetFiles() { return this.AllFiles; }

    constructor (fileExtension : string ) 
    {
        this.FILE_EXTENSION = fileExtension;
    }

	public GetAllFilesFromWorkspace(inPath: string | undefined) 
	{ 
        if (fs.existsSync(inPath))
        {
            var files=fs.readdirSync(inPath);
            this.FindFilesRecursively(files, inPath); 
        }
        else
        {
            console.log("no dir " + inPath);
            return ;
        }      
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
                this.GetAllFilesFromWorkspace(filename);
            else if (filename.indexOf(this.FILE_EXTENSION) >=0 ) 
                this.AddGcovFile(filename);
    
    }

    private AddGcovFile(file : string)
    {
        if ( this.AllFiles.includes(file) )
            return ;
        this.AllFiles.push(file);
    } 



}



export class GcovFileHandler extends FileHandler
{
    constructor()
    {
        super(".gcov");
    }

    
    public FindGcovFile(textEditor : vscode.TextEditor | undefined) 
    {
        if (textEditor)
        {            
            var openFile = textEditor.document.fileName;
            var foundFiles = this.FindAllFilesWithSameName(openFile);
            var result = this.GetGcovFile(foundFiles, openFile);
            return result;
        }
    }

    private FindAllFilesWithSameName(openFile : string)
    {
        var file = this.GetFilename(openFile);
        var foundFiles = [];
        for (var i = 0 ; i < this.AllFiles.length ; i++)
        {
            if (this.AllFiles[i].indexOf(file!) !== -1)
            foundFiles.push(this.AllFiles[i]);
        }
        return foundFiles;
    }
    private GetGcovFile (gcovFiles : string [], openFile : string)
    {
        var openFileLowerCase = path.normalize(openFile.toLowerCase());
        
        for (var i = 0 ; i < gcovFiles.length ; i++ )
        {
            var filename = this.ExtractSrcNameFromGcovContent(gcovFiles[i]);
            var desiredFile = this.RemoveLineBreaksAndRelativePath(filename);
            var normalizedFile = path.normalize(desiredFile);
            
            if (openFileLowerCase.includes(normalizedFile))
                return gcovFiles[i] ;
        }
    } 

    private GetFilename (file : string)
    {
        var temp = file.replace(/\\/g, '\/');
        return temp.split('\/').pop();
    }

    private ExtractSrcNameFromGcovContent(gcovFile : string)
    {
        var content = fs.readFileSync(gcovFile).toString();
        var firstLine = content.substring(0, content.indexOf('\n')).toLowerCase();
        var extractedFilename = firstLine.split('source:').pop();
        console.log("file: " + extractedFilename);
        return extractedFilename;
    }
    private RemoveLineBreaksAndRelativePath(path : string)
    {
        var removeLinebreak = path.replace(/(\r\n|\n|\r)/gm, "");
        var onlyBackslash = removeLinebreak.replace(/\\/g, '//');
        var replaceDotsAndSlash = onlyBackslash.replace(/\.\.\//g, '');

        return replaceDotsAndSlash;
    }


    
}