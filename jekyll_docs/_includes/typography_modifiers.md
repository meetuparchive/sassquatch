
<div class="line-gutters">
	<div class="unit size1of3">
        <h2>Typography modifiers</h2>	
		<p>Sometimes you need to nudge alignment and/or spacing of elements  byeond what the framework defaults handle. These modifiers should help you do this without the need to write new styles for minor tasks.</p>		
        <p><code>.leading-top | .padding-top</code>, <code>.leading-bottom | .padding-bottom</code>, <code>.leading-left | .padding-left</code>, <code>.leading-right | .padding-right</code>, <code>.leading-all | .padding-all</code>, <code>.leading-none | .padding-none</code>, <br /> <code>.margin-top</code>, <code>.margin-bottom</code>, <code>.margin-left</code>, <code>.margin-right</code>, <code>.margin-none</code>, <code>.align-left</code>, <code>.align-right</code>, <code>.align-center</code>, <code>.muted</code>, <code>.muted-opacity</code>, <code>.opacity-quarter</code>, <code>.small</code>, <code>.big</code>, <code>.caps</code>, <code>.bold</code>, <code>.debug</code></p>
	</div>
	<div class="unit lastUnit">
		<h3>Size &amp; color examples</h3>
        <p>This is a normal paragraph</p>
        <p class="big">This is a big paragraph <code>.big</code></p>
        <p class="small">This paragraph is small (you could also use a <code>&lt;small&gt;</code> element)<code>.small</code></p>
		<p class="muted">This paragraph is not small, but muted <code>.muted</code></p>
		<p class="muted-opacity">This paragraph is muted, but using opacity. <code>.muted-opacity</code></p>
		<p class="bold">This paragraph is bold <code>.bold</code></p>
		<p class="italic">This paragraph is italic <code>.italic</code></p>
		<p class="opacity-quarter">This paragraph 25% opaque <code>.opacity-quarter</code></p>
		<p class="caps">Fake capslock lol (text-transform) <code style="text-transform: lowercase;">.caps</code></p> 
        <p class="small muted caps">This paragraph is small <em>and</em> and muted <em>and</em> in caps <code style="text-transform: lowercase;">.small.muted.caps</code></p>
		<p><a href="" class="unlink">This link isn't colored like a link <code>.unlink</code></a></p> 

		<h3 class="leading-top">Alignment</h3>
		<p class="align-left">This paragraph is aligned left (default) <code>.align-left</code></p>
		<p class="align-center">This paragraph is centered <code>.align-center</code></p>
		<p class="align-right">This paragraph is aligned right <code>.align-right</code></p>

		<h3 class="margin-top">Vertical spacing</h3>
		<h4>Leading (padding)</h4>
		<p class="leading-top guide-hasBackground">This paragraph has a line of leading above it <code>.leading-top</code></p>
		<p class="guide-hasBackground">Normal paragraph</p>
		<p class="leading-bottom guide-hasBackground">This paragraph has a line of leading below it <code>.leading-bottom</code></p>

		<h4>Margin</h4>
		<div class="guide-hasBackground">Normal div</div>
		<div class="margin-top guide-hasBackground">This div has a line of margin above it <code>.margin-top</code></div>
		<div class="margin-bottom guide-hasBackground">This div has a line of margin below it <code>.margin-bottom</code></div>
		<p class="guide-hasBackground margin-none">This is actually a <code>p</code>, but the margin is overridden by <code>.margin-none</code></p>
		<p class="guide-hasBackground">Normal Paragraph</p>

		<h3>Horizontal spacing</h3>
        <p>In this example, we're applying the horizontal spacing classes on a few <code>.inline-block</code> paragraphs</p> 
        <h4>Padding</h4>
        <p class="inline-block align-center guide-hasBackground padding-right">room on the right <code>.padding-right</code></p>
        <p class="inline-block align-center guide-hasBackground">normal</p>
        <p class="inline-block align-center guide-hasBackground padding-left">room on the left <code>.padding-left</code></p>

        <h4>Margin</h4>
        <p class="inline-block align-center guide-hasBackground margin-right">room on the right <code>.margin-right</code></p>
        <p class="inline-block align-center guide-hasBackground">normal</p>
        <p class="inline-block align-center guide-hasBackground margin-left">room on the left <code>.margin-left</code></p>

		<h3 class="margin-top">Highlighted things <code>.highlighted</code></h3>
		<p class="inline-block align-center highlighted padding-left padding-right">Sometimes, you want something to be highlighted</p>

        <h3 class="margin-top">Debugging <code>.debug</code></h3>
        <p class="debug">Sometimes, you just want to check something in JSP by printing a value on the page or highlighting an element. Don't use this in production, though.</p>
	</div>
</div>

