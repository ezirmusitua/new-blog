import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import { Article } from '../models/article';
import { ArticleService } from '../article.service';
import { MarkdownService } from '../markdown.service';
import { RxSubjectService } from '../shared/rx-subject.service';
import { FloatingNavCategory } from '../shared/enums';

@Component({
  selector: 'jfb-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.scss']
})
export class ArticleContentComponent implements OnInit {
  isPageLoaded: boolean = false;
  articleId: string;
  article: Article;
  safeArticleHtmlContent: SafeHtml;
  constructor(
    private markdownService: MarkdownService,
    private articleService: ArticleService,
    private currentRoute: ActivatedRoute,
    private subjects: RxSubjectService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // this.currentRoute.params.subscribe((params) => {
    //   this.articleId = params['articleId'];
    //   if (this.articleId) {
    //     this.articleService.getArticleById(this.articleId).subscribe(article => {
    //       this.article = article;
    //       this.isPageLoaded = true;
    //     });
    //   }
    // });
    // this.subjects.floatingNavBtnSubject.subscribe((res) => {
    //   if (res.category === FloatingNavCategory.EDIT) {
    //     this.router.navigate(['article', this.articleId, 'edit']);
    //   }
    // });
    this.safeArticleHtmlContent = this.markdownService.toHtml(
      "# 强类型 JavaScript 的解决方案  \n\n" +
      "JavaScript 是一种[弱类型](http://en.wikipedia.org/wiki/Strong_and_weak_typing)（或称[动态类型](http://en.wikipedia.org/wiki/Dynamic_programming_language)）语言，即变量的类型是不确定的。  \n\n" +
      "```javascript\n" +
      "x = 5; // 5\n" +
      "x = x + 'A'; // '5A'\n" +
      "```\n" +
      "上面代码中，变量x起先是一个数值，后来是一个字符串，类型完全由当前的值决定，这就叫弱类型。  \n" +
      "弱类型的好处是十分灵活，可以写出非常简洁的代码。但是，对于大型项目来说，强类型更有利，可以降低系统的复杂度，在编译时就发现类型错误，减轻程序员的负担。  \n" +
      "一直有人尝试，让 JavaScript 变成强类型语言。在[官方](http://wiki.ecmascript.org/doku.php?id=strawman:types)最终支持强类型之前，本文介绍三种现在就可用的解决方案。  \n" +
      "![](http://image.beekka.com/blog/2015/bg2015020801.jpg?i=407300661)  \n" +
      "（题图：摄于花莲，台湾，2012年6月）  \n" +
      "## 一、TypeScript  \n" +
      "[TypeScript](http://www.typescriptlang.org/) 是微软2012年推出的一种编程语言，属于 JavaScript 的超集，可以编译为 JavaScript 执行。 它的最大特点就是支持强类型和 [ES6 Class](http://es6.ruanyifeng.com/#docs/class)。  \n" +
      "安装TypeScript。  \n" +
      "```bash  \n" +
      "$ npm install -g typescript  \n" +
      "```\n" +
      "然后，为变量指定类型。  \n" +
      "```javascript\n" +
      "// greet.ts  \n" +
      "function greet(person: string) {  \n" +
      "  console.log(\"Hello person\"); \n" +
      "}  \n" +
      "greet([0, 1, 2]);  \n" +
      "```  \n" +
      "上面是文件 greet.ts 的代码，后缀名 ts 表明这是 TypeScript 的代码。函数 greet 的参数，声明类型为字符串，但在调用时，传入了一个数组。  \n" +
      "使用 tsc 命令将 ts 文件编译为 js 文件，就会抛出类型不匹配的错误。  \n" +
      "```bash  \n" +
      "$ tsc greeter.ts  \n" +
      "greet.ts(5,9): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.  \n" +
      "```  \n" +
      "## 二、flowcheck  \n" +
      "[flowcheck](http://gcanti.github.io/flowcheck/) 是一个轻量级的类型断言库，可以在运行时（runtime）检查变量类型是否正确。  \n" +
      "首先，安装。  \n" +
      "```javascript  \n" +
      "$ npm install -g flowcheck  \n" +
      "```  \n" +
      "然后，编写一个声明了变量类型的脚本。  \n" +
      "```javascript  \n" +
      "function sum(a: number, b: number) {  \n" +
      "  return a + b;  \n" +
      "}  \n" +
      "sum('hello','world')  \n" +
      "```  \n" +
      "接着，使用下面的命令，将脚本转换为正常的 JavaScript 文件。  \n" +
      "```bash  \n" +
      "$ browserify -t flowcheck -t [reactify --strip-types] input.js -o output.js  \n" +
      "```  \n" +
      "转换后的文件如下。  \n" +
      "```javascript  \n" +
      "var _f = require(\"flowcheck/assert\");  \n" +
      "function sum(a, b) {  \n" +
      "	_f.check(arguments, _f.arguments([_f.number, _f.number]));  \n" +
      "  return a + b;  \n" +
      "}  \n" +
      "```  \n" +
      "可以看到，代码中插入一个断言库。每次运行函数之前，会先执行断言，如果类型不符就报错。  \n" +
      "```bash  \n" +
      "$ node output.js  \n" +
      "// throw new TypeError(message);  \n" +
      "            ^  \n" +
      "TypeError:  \n" +
      "Expected an instance of number got \"hello\", context: arguments / [number, number] / 0  \n" +
      "Expected an instance of number got \"world\", context: arguments / [number, number] / 1  \n" +
      "```  \n" +
      "## 三、flow  \n" +
      "[Flow](http://flowtype.org/) 是 Facebook 在2014年发布的一个类型检查工具，用来检查 React 的源码。  \n" +
      "安装命令如下。  \n" +
      "```javascript  \n" +
      "$ npm install --global flow-bin  \n" +
      "```  \n" +
      "如果安装不成功（我就是如此），就需要自己从[源码](https://github.com/facebook/flow)编译了。  \n" +
      "Flow 的用法很多，我只举几个例子。前文介绍的两种工具，只能检查声明了类型的变量，而 Flow 可以推断变量类型。  \n" +
      "```javascript  \n" +
      "// hello.js  \n" +
      "/* @flow */  \n" +
      "function foo(x) {  \n" +
      "  return x*10;  \n" +
      "}  \n" +
      "foo(\"Hello, world!\");  \n" +
      "```  \n" +
      "上面是文件 hello.js ，该文件的第一行是注释，表明需要使用 Flow 检查变量类型。  \n" +
      "```bash  \n" +
      "$ flow check  \n" +
      "hello.js:7:5,19: string  \n" +
      "This type is incompatible with  \n" +
      "/hello.js:4:10,13: number  \n" +
      "```  \n" +
      "运行 flow check 命令，得到报错信息：预期函数 foo 的参数是一个数值，但是实际为一个字符串。  \n" +
      "Flow 也支持变量的类型声明。  \n" +
      "```javascript  \n" +
      "/* @flow */  \n" +
      "function foo(x: string, y: number): string {  \n" +
      "  return x.length * y;  \n" +
      "}  \n" +
      "foo(\"Hello\", 42);  \n" +
      "```  \n" +
      "另一个有趣的功能是，Flow 可以将类型注释（annotation），转为类型声明。  \n" +
      "```javascript  \n" +
      "// annotation.js  \n" +
      "/**  \n" +
      "  @param {number} x  \n" +
      "  @return {number}  \n" +
      " */  \n" +
      "function square(x) {  \n" +
      "  return x * x;  \n" +
      "}  \n" +
      "square(5);  \n" +
      "```  \n" +
      "运行 flow port 命令，会得到下面的结果。  \n" +
      "```bash  \n" +
      "$ flow port annotation.js  \n" +
      "function square(x: number) : number {  \n" +
      "   return x * x;  \n" +
      " }  \n" +
      "```  \n" +
      "Flow 的更多介绍，可以阅读[《Exploring Flow, Facebook's Type Checker for JavaScript》](http://www.crmarsh.com/flow/)。  \n" +
      "本文的原始幻灯片点击[这里](http://slides.ruanyifeng.com/type/)（里面有更多内容）。  \n" +
      "（完）  "
    ).sanitize().end() as SafeHtml;
  }
}
