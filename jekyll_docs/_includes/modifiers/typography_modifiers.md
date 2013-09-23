
<div class="line-gutters">
	<div class="unit size1of3">
		<h2>Typography modifiers</h2>	
		<p>Sometimes you need to nudge alignment and/or spacing of elements  byeond what the framework defaults handle. These modifiers should help you do this without the need to write new styles for minor tasks.</p>		
		<p>
			<code>.leading-top | .padding-top</code>, <code>.leading-bottom | .padding-bottom</code>, <code>.leading-left | .padding-left</code>, <code>.leading-right | .padding-right</code>, <code>.leading-all | .padding-all</code>, <code>.leading-none | .padding-none</code>
		</p>
		<p>
			<code>.margin-top</code>, <code>.margin-bottom</code>, <code>.margin-left</code>, <code>.margin-right</code>, <code>.margin-none</code>
		</p>
		<p>
			<code>.wrapNice</code>,
			<code>.ellipsize</code>,
			<code>.unlink</code>
		</p>
		<p>
			<code>.align-left</code>, <code>.align-right</code>, <code>.align-center</code>, <code>.valign-top</code>, <code>.valign-middle</code>, <code>.valign-bottom</code>
		</p>
		<p>
			<code>.muted</code>, <code>.muted-opacity</code>, <code>.opacity-quarter</code>
		</p>
		<p>
			<code>.small</code>, <code>.big</code>, <code>.caps</code>, <code>.bold</code>, <code>.italic</code>
		</p>
		<p>
			<code>.debug</code>, <code>.highlighted</code>, <code>.shaded</code>, <code>.shaded-lighter</code>, <code>.shaded-red</code>, <code>.shaded-pixelated</code>
		</p>
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

		<h3 class="leading-top">Text flow</h3>
		<div class="doc-box doc-content">
			<h4>Wrapping <code>.wrapNice</code></h4>
			<p class="wrapNice">This paragraph has a super long word in it.
			Iconhere abcdedghsdfsdfsdfsdfsdjkfsdbfjsdfsdfdabcdedghsdfsdfsdfsdfsdjkfsdbfjsdfsdfdabcdedghsdfsdfsdfsdfsdjkfsdbfjsdfsdfd dedghsdfsdfsdfsdfsdjkfsdbfjsdfsdfddedghsdfsdfsdfsdfsdjkfsdbfjsdfsdfd. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non sapien at lorem euismod mollis quis ac enim. Vestibulum non dolor augue, in molestie risus. Proin elit nibh, dapibus ut pulvinar pretium, iaculis sed purus.</p>
			<h4>Truncation <code>.ellipsize</code></h4>
			<p class="ellipsize" style="width: 520px; height: 20px;">This paragraph has a fixed size.
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non sapien at lorem euismod mollis quis ac enim. Vestibulum non dolor augue, in molestie risus. Proin elit nibh, dapibus ut pulvinar pretium, iaculis sed purus. Curabitur pellentesque pulvinar erat non porttitor. Etiam gravida, ligula id tincidunt interdum, tortor enim auctor orci, eget iaculis nisl nibh a dolor. Nullam purus purus, viverra in adipiscing sed, tincidunt eget ipsum. Nulla facilisi. Morbi ut justo arcu, venenatis venenatis est. Cras eget augue a leo interdum porttitor. Phasellus quis sapien in urna vehicula gravida. In id magna quis dolor volutpat tincidunt sit amet eu lacus. Nulla neque tellus, porttitor at vehicula nec, pulvinar non eros.Donec vel mattis nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed a urna non nunc egestas dapibus. Aliquam nec aliquet lacus. Duis vulputate, neque in venenatis vehicula, tortor libero laoreet massa, non dictum lacus turpis sit amet elit. In vel nulla elit. Phasellus quis urna tempor elit tristique bibendum non a augue.Nam pulvinar aliquet libero, ac dapibus odio dapibus sit amet. Proin id orci dui. Donec sit amet ligula eget quam egestas viverra vitae vel lectus. Sed consequat cursus felis, sed condimentum metus pharetra ut. Donec hendrerit ligula sed sapien vestibulum ac gravida dui facilisis. Morbi vestibulum posuere nisl, at dapibus sem dapibus id. Cras sit amet erat id metus facilisis vehicula. Nullam erat felis, euismod sit amet iaculis nec, placerat sed urna. Donec id quam lectus.Nunc et leo nulla, vitae rhoncus lorem. In vitae orci tellus, in scelerisque metus. Curabitur pretium porttitor feugiat. Integer quis lacus odio. Aenean mollis dignissim velit. In sagittis aliquet ullamcorper. Proin viverra iaculis velit, eget vestibulum nulla laoreet ut. Nam sit amet nibh tellus. Praesent ac tellus eu velit congue ornare quis at est. Aliquam quis velit id erat viverra cursus nec ut lorem. Nulla neque purus, condimentum ut ornare et, mattis vitae sapien.</p>
		</div>

		<h3 class="leading-top">Alignment</h3>
		<div class="doc-box doc-content">
			<h4>Horizontal alignment</h4>
			<p class="align-left">This paragraph is aligned left (default) <code>.align-left</code></p>
			<p class="align-center">This paragraph is centered <code>.align-center</code></p>
			<p class="align-right">This paragraph is aligned right <code>.align-right</code></p>
		</div>

		<h3 class="margin-top">Vertical spacing</h3>
		<div class="doc-box doc-padding">
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
		</div>

		<h3>Horizontal spacing</h3>
		<div class="doc-box doc-content">
			<p>In this example, we're applying the horizontal spacing classes on a few <code>.inline-block</code> paragraphs</p> 
			<h4>Padding</h4>
			<p class="inline-block align-center guide-hasBackground padding-right">room on the right <code>.padding-right</code></p>
			<p class="inline-block align-center guide-hasBackground">normal</p>
			<p class="inline-block align-center guide-hasBackground padding-left">room on the left <code>.padding-left</code></p>

			<h4>Margin</h4>
			<p class="inline-block align-center guide-hasBackground margin-right">room on the right <code>.margin-right</code></p>
			<p class="inline-block align-center guide-hasBackground">normal</p>
			<p class="inline-block align-center guide-hasBackground margin-left">room on the left <code>.margin-left</code></p>
		</div>

		<h3 class="margin-top">Highlighted things <code>.highlighted</code></h3>
		<div class="doc-box doc-content">
			<p class="inline-block align-center highlighted padding-left padding-right">Sometimes, you want something to be highlighted</p>
		</div>

		<h3 class="margin-top">Shaded things <code>.shaded</code>, <code>.shaded-lighter</code>, <code>.shaded-red</code></h3>
		<div class="doc-box doc-content">
			<p class="inline-block align-center shaded padding-left padding-right">Sometimes, you want something to be shaded</p>
			<p class="inline-block align-center shaded-lighter padding-left padding-right">Sometimes, you want something to be shaded</p>
			<p class="inline-block align-center shaded-red padding-left padding-right">Sometimes, you want something to be shaded</p>
		</div>

		<h3 class="margin-top">Pixelated things <code>.shaded-pixelate</code></h3>
		<div class="doc-box doc-content shaded-pixelate">
			<p class="inline-block align-center padding-left padding-right">This <code>.doc-box</code> has a class of <code>.shaded-pixelate</code></p>
			<p class="inline-block align-center padding-left padding-right">This <code>.doc-box</code> has a class of <code>.shaded-pixelate</code></p>
		</div>

	  <h3 class="margin-top">Debugging <code>.debug</code></h3>
	  <p class="debug">Sometimes, you just want to check something in JSP by printing a value on the page or highlighting an element. Don't use this in production, though (on meetup, we use the isDev body class to show this, otherwise it's set to display:none).</p>
	</div>
</div>

