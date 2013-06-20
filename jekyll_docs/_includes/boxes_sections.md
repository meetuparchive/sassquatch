<h2>Box and sections</h2>
<div class="line-gutters" id="document-boxes">
	<div class="unit size1of3">
		<p><code>.doc-box</code> is the main box of the page. 99% of the time, there should be only one.</p>
		<p>Optionally, your box can be divided into columns by using the standard grid, if you so desire. Do not use gutters here.</p>
		<p>Next, a "section" of content is created by adding <code>.doc-content</code> . Simple boxes may have only one section.</p>
	</div>

	<div class="lastUnit">
		<div class="doc-box">
			<div class="doc-content">
				<h1>My first document box</h1>

				<p>Let's start with some prose. Proident high life food truck, four loko accusamus esse photo booth single-origin coffee tattooed laborum mollit. 3 wolf moon gentrify organic +1 scenester put a bird on it, photo booth nisi.</p>
			</div>

			<div class="doc-content">
				<h2>List of things</h2>
				<ul class="dividedList">
					<li>
						<p>Leggings Austin minim readymade aliquip, elit voluptate aesthetic. Cosby sweater organic single-origin coffee aliquip adipisicing, food truck american apparel. Aesthetic high life qui retro cliche.</p>
					</li>
					<li>
						<p>Leggings Austin minim readymade aliquip, elit voluptate aesthetic. Cosby sweater organic single-origin coffee aliquip adipisicing, food truck american apparel. Aesthetic high life qui retro cliche.</p>
					</li>
				</ul>	
			</div>
		</div>

		<div class="highlight"><pre><code class="html"> 
		<span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">&quot;doc-box&quot;</span><span class="nt">&gt;</span>
			<span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">&quot;doc-content&quot;</span><span class="nt">&gt;</span>
				<span class="nt">&lt;h1&gt;</span>My first document box<span class="nt">&lt;/h1&gt;</span>
				<span class="nt">&lt;p&gt;</span>Let&#39;s start with some prose...<span class="nt">&lt;/p&gt;</span>
			<span class="nt">&lt;/div&gt;</span>
			<span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">&quot;doc-content&quot;</span><span class="nt">&gt;</span>
				<span class="nt">&lt;h2&gt;</span>List of things<span class="nt">&lt;/h2&gt;</span>
				<span class="nt">&lt;ul</span> <span class="na">class=</span><span class="s">&quot;dividedList&quot;</span><span class="nt">&gt;</span>
					<span class="nt">&lt;li&gt;</span>
						<span class="nt">&lt;p&gt;</span>Leggings Austin minim...<span class="nt">&lt;/p&gt;</span>
					<span class="nt">&lt;/li&gt;</span>
					<span class="nt">&lt;li&gt;</span>
						<span class="nt">&lt;p&gt;</span>Leggings Austin minim...<span class="nt">&lt;/p&gt;</span>
					<span class="nt">&lt;/li&gt;</span>
				<span class="nt">&lt;/ul&gt;</span>	
			<span class="nt">&lt;/div&gt;</span>
		<span class="nt">&lt;/div&gt;</span>
		
</code></pre></div>

	</div>
</div>