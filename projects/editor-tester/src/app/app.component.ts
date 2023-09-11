import { Component, OnInit } from '@angular/core';
import { DiffEditorModel, NgxEditorModel } from '../../../editor/src/lib/types';

declare var monaco: any;

@Component({
  selector: 'app-root',
  template: `
    <h1>Editor</h1>
    <p-button (click)="javaLanguage()" label="Java"></p-button>&nbsp;&nbsp;&nbsp;
    <p-button (click)="jsLanguage()" label="JavaScript"></p-button>&nbsp;&nbsp;&nbsp;
    <p-button (click)="cSharpLanguage()" label="C#"></p-button>&nbsp;&nbsp;&nbsp;
    <p-button (click)="pythonLanguage()" label="Python"></p-button>&nbsp;&nbsp;&nbsp;
    <p-button (click)="typeScriptLanguage()" label="TypeScript"></p-button>&nbsp;&nbsp;&nbsp;
    <p-button (click)="code = ''; codeInput=''" label="Set Value To Empty String"></p-button>&nbsp;&nbsp;&nbsp;
    <p-button (click)="showMultiple = !showMultiple" label=" Multiple Editor">{{showMultiple ? 'Hide ' : 'Show '}}</p-button>

    <div style="height: 100px">
        <ngx-monaco-editor style="height: 100%" [options]="options" [(ngModel)]="code" (onInit)="onInit($event)"></ngx-monaco-editor>
    </div>

    <ngx-monaco-editor *ngIf="showMultiple" [options]="options" [(ngModel)]="code"></ngx-monaco-editor>

    <pre>{{code | json}}</pre>

    <h1>Diff Editor</h1>
    <p-button (click)="updateDiffModel()" label="Update Models"></p-button>
    <ngx-monaco-diff-editor [options]="options" [originalModel]="originalModel" [modifiedModel]="modifiedModel"
                            (onInit)="onInitDiffEditor($event)"></ngx-monaco-diff-editor>

    <ngx-monaco-editor [options]="options" [model]="model"></ngx-monaco-editor>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  codeInput = 'Sample Code';
  editor: any;
  diffEditor: any;
  showMultiple = false;
  toggleLanguage = true;
  options = {
    theme: 'vs-dark'
  };

  code: string;

  javaCode = `public void hello() {
   System.out.println ("Hello world!");
}`;

  jsCode = `function hello() {
	 alert('Hello world!');
}`;

typeScriptCode = `function hello() {
  console.log('Hello world!');
}`;

  cSharpCode = `static void Main() {
  Console.WriteLine("Hello World!");
}`;

pythonCode = `print("Hello, World!")`;

  originalModel: DiffEditorModel = {
    code: 'Hello world!',
    language: 'text/plain'
  };

  modifiedModel: DiffEditorModel = {
    code: 'hello orlando!',
    language: 'text/plain'
  };

  jsonCode = [
    '{',
    '    "p1": "v3",',
    '    "p2": false',
    '}'
  ].join('\n');

  model: NgxEditorModel = {
    value: this.jsonCode,
    language: 'json'
  };

  constructor() {
  }

  ngOnInit() {
    this.javaLanguage();
  }

  javaLanguage() {
      this.code = this.javaCode;
      this.options = Object.assign({}, this.options, { language: 'java' });
  }

  jsLanguage() {
    this.code = this.jsCode;
    this.options = Object.assign({}, this.options, { language: 'javascript' });
  }

  cSharpLanguage() {
      this.code = this.cSharpCode;
      this.options = Object.assign({}, this.options, { language: 'cSharp' });
  }

  typeScriptLanguage() {
    this.code = this.typeScriptCode;
    this.options = Object.assign({}, this.options, { language: 'TypeScript' });
  }

  pythonLanguage() {
    this.code = this.pythonCode;
    this.options = Object.assign({}, this.options, { language: 'Python' });
  }

  updateDiffModel() {
    this.originalModel = Object.assign({}, this.originalModel, { code: 'abcd' });
    this.modifiedModel = Object.assign({}, this.originalModel, { code: 'ABCD ef' });
  }

  onInit(editor) {
    this.editor = editor;
    console.log(editor);
    this.model = {
      value: this.jsonCode,
      language: 'json',
      uri: monaco.Uri.parse('a://b/foo.json')
    };
  }

  onInitDiffEditor(editor) {
    this.diffEditor = editor;
    console.log(editor);
  }
}
