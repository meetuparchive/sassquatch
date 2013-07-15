
<h2 class="section-subtitle">doc-box</h2>

<p>
	For the most part <code>.doc-box</code> is inherited from desktop Sassquatch.<br/>
	It's rounded and bordered and has a white background.<br/>
	In order for the boxy-ness to be seen in a one-column layout, it also has margins in mobile Sassquatch.
</p>

<div class="doc-box">
	This is a basic doc-box. It has no padding so right now it looks pretty cramped. 
	It usually wraps some kind of content, like <code>.doc-content</code> or <code>.touchList</code>
</div>

<h2 class="section-subtitle">doc-content</h2>
<div class="doc-content">
	<p><code>.doc-content</code> is basically just padded content. 
	It can sit directly on the background, like this one is.
	Believe it or not, this is wrapped in <code>.doc-content</code>.</p>
	<p>OR it can be nested within a doc-box for header, footer, and sections: </p>
</div>

<div class="doc-box">
	<div class="doc-content">
		<h2>Slightly complex doc-box</h2>
	</div>
	<div class="doc-content">
		<p>It has <code>.doc-content</code> children to wrap the heading and section.</p>
		<p>
			There are tags for these elements on mobile: 
			<code>m:box</code>, <code>m:section</code>, <code>m:head</code>, <code>m:foot</code>.
		</p>
	</div>
</div>


<p class="lighter margin-top">TODO: full-width, unrounded, white doc-box or doc-content extension.</p>