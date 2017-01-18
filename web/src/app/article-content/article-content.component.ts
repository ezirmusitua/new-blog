import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jfb-article-content',
  templateUrl: './article-content.component.html',
  styleUrls: ['./article-content.component.css']
})
export class ArticleContentComponent implements OnInit {

  article = {
    id: 1,
    title: 'hello world ~ 1',
    tags: ['h1', 'h2'],
    description: 'hello world',
    catalog: [],
    content: `
<h1><a id="Dillinger_0"></a>Dillinger</h1>
<p><a href="https://nodesource.com/products/nsolid"><img src="https://cldup.com/dTxpPi9lDf.thumb.png" alt="N|Solid"></a></p>
<p>Dillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.</p>
<ul>
<li>Type some Markdown on the left</li>
<li>See HTML in the right</li>
<li>Magic</li>
</ul>
<p>You can also:</p>
<ul>
<li>Import and save files from GitHub, Dropbox, Google Drive and One Drive</li>
<li>Drag and drop files into Dillinger</li>
<li>Export documents as Markdown, HTML and PDF</li>
</ul>
<p>Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As <a href="http://daringfireball.net">John Gruber</a> writes on the <a href="http://daringfireball.net/projects/markdown/">Markdown site</a></p>
<blockquote>
<p>The overriding design goal for Markdown’s<br>
formatting syntax is to make it as readable<br>
as possible. The idea is that a<br>
Markdown-formatted document should be<br>
publishable as-is, as plain text, without<br>
looking like it’s been marked up with tags<br>
or formatting instructions.</p>
</blockquote>
<p>This text you see here is <em>actually</em> written in Markdown! To get a feel for Markdown’s syntax, type some text into the left window and watch the results in the right.</p>
<h3><a id="Tech_27"></a>Tech</h3>
<p>Dillinger uses a number of open source projects to work properly:</p>
<ul>
<li><a href="http://angularjs.org">AngularJS</a> - HTML enhanced for web apps!</li>
<li><a href="http://ace.ajax.org">Ace Editor</a> - awesome web-based text editor</li>
<li><a href="https://github.com/markdown-it/markdown-it">markdown-it</a> - Markdown parser done right. Fast and easy to extend.</li>
<li><a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a> - great UI boilerplate for modern web apps</li>
<li><a href="http://nodejs.org">node.js</a> - evented I/O for the backend</li>
<li><a href="http://expressjs.com">Express</a> - fast node.js network app framework <a href="http://twitter.com/tjholowaychuk">@tjholowaychuk</a></li>
<li><a href="http://gulpjs.com">Gulp</a> - the streaming build system</li>
<li><a href="https://github.com/madrobby/keymaster">keymaster.js</a> - awesome keyboard handler lib by <a href="http://twitter.com/thomasfuchs">@thomasfuchs</a></li>
<li><a href="http://jquery.com">jQuery</a> - duh</li>
</ul>
<p>And of course Dillinger itself is open source with a <a href="https://github.com/joemccann/dillinger">public repository</a><br>
on GitHub.</p>
<h3><a id="Installation_44"></a>Installation</h3>
<p>Dillinger requires <a href="https://nodejs.org/">Node.js</a> v4+ to run.</p>
<p>Download and extract the <a href="https://github.com/joemccann/dillinger/releases">latest pre-built release</a>.</p>
<p>Install the dependencies and devDependencies and start the server.</p>
<pre><code class="language-sh">$ <span class="hljs-built_in">cd</span> dillinger
$ npm install <span class="hljs-operator">-d</span>
$ node app
</code></pre>
<p>For production environments…</p>
<pre><code class="language-sh">$ npm install --production
$ npm run predeploy
$ NODE_ENV=production node app
</code></pre>
<h3><a id="Plugins_66"></a>Plugins</h3>
<p>Dillinger is currently extended with the following plugins</p>
<ul>
<li>Dropbox</li>
<li>Github</li>
<li>Google Drive</li>
<li>OneDrive</li>
</ul>
<p>Readmes, how to use them in your own application can be found here:</p>
<ul>
<li><a href="https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md">plugins/dropbox/README.md</a></li>
<li><a href="https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md">plugins/github/README.md</a></li>
<li><a href="https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md">plugins/googledrive/README.md</a></li>
<li><a href="https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md">plugins/onedrive/README.md</a></li>
</ul>
<h3><a id="Development_82"></a>Development</h3>
<p>Want to contribute? Great!</p>
<p>Dillinger uses Gulp + Webpack for fast developing.<br>
Make a change in your file and instantanously see your updates!</p>
<p>Open your favorite Terminal and run these commands.</p>
<p>First Tab:</p>
<pre><code class="language-sh">$ node app
</code></pre>
<p>Second Tab:</p>
<pre><code class="language-sh">$ gulp watch
</code></pre>
<p>(optional) Third:</p>
<pre><code class="language-sh">$ karma start
</code></pre>
<h4><a id="Building_for_source_105"></a>Building for source</h4>
<p>For production release:</p>
<pre><code class="language-sh">$ gulp build --prod
</code></pre>
<p>Generating pre-built zip archives for distribution:</p>
<pre><code class="language-sh">$ gulp build dist --prod
</code></pre>
<h3><a id="Docker_114"></a>Docker</h3>
<p>Dillinger is very easy to install and deploy in a Docker container.</p>
<p>By default, the Docker will expose port 80, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.</p>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> dillinger
npm run-script build-docker
</code></pre>
<p>This will create the dillinger image and pull in the necessary dependencies. Moreover, this uses a <em>hack</em> to get a more optimized <code>npm</code> build by copying the dependencies over and only installing when the <code>package.json</code> itself has changed.  Look inside the <code>package.json</code> and the <code>Dockerfile</code> for more details on how this works.</p>
<p>Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 80 of the Docker (or whatever port was exposed in the Dockerfile):</p>
<pre><code class="language-sh">docker run <span class="hljs-operator">-d</span> -p <span class="hljs-number">8000</span>:<span class="hljs-number">8080</span> --restart=<span class="hljs-string">"always"</span> &lt;youruser&gt;/dillinger:latest
</code></pre>
<p>Verify the deployment by navigating to your server address in your preferred browser.</p>
<pre><code class="language-sh"><span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8000</span>
</code></pre>
<h4><a id="Kubernetes__Google_Cloud_137"></a>Kubernetes + Google Cloud</h4>
<p>See <a href="https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md">KUBERNETES.md</a></p>
<h4><a id="dockercomposeyml_142"></a>docker-compose.yml</h4>
<p>Change the path for the nginx conf mounting path to your full path, not mine!</p>
<h3><a id="NSolid_and_NGINX_146"></a>N|Solid and NGINX</h3>
<p>More details coming soon.</p>
<h3><a id="Todos_151"></a>Todos</h3>
<ul>
<li>Write Tests</li>
<li>Rethink Github Save</li>
<li>Add Code Comments</li>
<li>Add Night Mode</li>
</ul>
<h2><a id="License_158"></a>License</h2>
<p>MIT</p>
<p><strong>Free Software, Hell Yeah!</strong></p>
    `
  }
  constructor() { }

  ngOnInit() { }

}
